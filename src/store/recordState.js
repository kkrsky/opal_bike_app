import L from "leaflet";

class Updater {
  constructor() {
    this.targets = [];
    this.updaterId = null;
    this.isStart = false;
  }
  // アニメーション対象を追加
  add(target) {
    this.targets.push(target);
  }

  // アニメーション対象を削除
  remove(target) {
    this.targets = this.targets.filter((element) => element !== target);
  }

  // アニメーションループ開始
  start() {
    let options = {
      updaterId: this.updaterId,
      isStart: this.isStart,
    };
    this.targets.forEach((element) => element.start(options));
    this.updaterId = window.requestAnimationFrame(this.update.bind(this));
    // console.log(this.updaterId)
    this.isStart = true;
  }
  stop() {
    // console.log(this.updaterId)
    window.cancelAnimationFrame(this.updaterId);
    let options = {
      updaterId: this.updaterId,
      isStart: this.isStart,
    };
    this.targets.forEach((element) => element.stop(options));
    // console.log(this.targets)
  }

  finish() {
    this.isStart = false;
    this.stop();
  }

  // 各アニメーション対象に更新を通知
  update() {
    this.updaterId = window.requestAnimationFrame(this.update.bind(this));
    this.targets.forEach((element) => element.update(this.isStart));
  }
}
class TimeAnimator {
  constructor() {
    this.startTime = 0;
    this.stopDiffTime = 0;
    this.displayTime = "00:00:00";
  }

  // アニメーション開始時の時間を取得
  start(op) {
    if (op.isStart) {
      //一度カウントを開始した
      //none
      let currentTime = new Date().getTime();
      this.stopDiffTime = currentTime - this.stopDiffTime;
      this.startTime += this.stopDiffTime;
    } else {
      //カウント開始
      this.startTime = new Date().getTime();
    }
  }
  stop(op) {
    // console.log(op)
    if (op.isStart) {
      this.stopDiffTime = new Date().getTime();
      // window.cancelAnimationFrame(op.updaterId)
    } else {
      //最初のカウント前
      // window.cancelAnimationFrame(op.updaterId)
      this.displayTime = "00:00:00";
      this.stopDiffTime = 0;
    }
  }

  // 描画毎にここが呼ばれる
  update() {
    // ここで経過時間をもとに進捗を算出し、要素に反映
    let currentTime = new Date().getTime();
    let displayTime = currentTime - this.startTime;
    // console.log(displayTime,currentTime,this.startTime)
    this.displayTime = this.calcDisplayTime(displayTime);
  }

  calcDisplayTime(time) {
    function under2(time) {
      return ("00" + time).slice(-2);
    }
    let hour = Math.floor(time / 1000 / 60 / 60);
    let minute = Math.floor(time / 1000 / 60) % 6;
    let second = Math.floor(time / 1000) % 60;

    let timeArry = [under2(hour), under2(minute), under2(second)];

    return timeArry.join(":");
  }

  // 進捗算出
  // e: easingType
  // t: currentTime
  // b: startValue
  // c: endValue
  // d: totalTime
  getProgress(e, t, b, c, d) {
    let progress = 0;

    if (t < 0) return b;
    if (t > d) return c;

    switch (e) {
      case "linear":
        progress = (c * t) / d + b;
        break;
      case "easeInSine":
        progress = -c * Math.cos((t / d) * this.PI) + c + b;
        break;
      default:
        break;
    }
    return progress;
  }
}

class PositionAnimator {
  constructor() {
    this.displayPosition = []; //lng,lat
    this.positionHistory = [];

    //
    this.watchId = null;
  }

  //core
  start(op) {
    if (op.isStart) {
      //null
      this.getCurrentPosition();
      this.watchCurrentPosition();
    } else {
      //初回
      this.getCurrentPosition();
      this.watchCurrentPosition();
    }
  }
  stop(op) {
    if (op.isStart) {
      this.watchCurrentPositionEnd();
    } else {
      //start前の状態を定義
      this.positionHistory = [];
    }
  }
  update() {
    //this.displayPosition
    console.log(this.positionHistory);
  }

  //functions
  getCurrentPosition() {
    // console.log("getCurrentPosition start", window.navigator.geolocation);

    let options = {
      maximumAge: 3000,
      enableHighAccuracy: true,
      timeout: 50000,
    };
    let timerStart = window.performance.now();
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        let timerStop = performance.now();
        console.log("perform time", timerStop - timerStart);

        this.displayPosition = [
          position.coords.longitude,
          position.coords.latitude,
        ];

        this.positionHistory.push(this.displayPosition);
      },
      (error) => {
        console.log(("error:", error));
      },
      options
    );
  }
  watchCurrentPosition() {
    console.log("start watch position");
    let timerStart = window.performance.now();
    let onSuccess = (position) => {
      console.log(position);
      let timerStop = window.performance.now();
      console.log("perform time", timerStop - timerStart);
      timerStart = timerStop;

      let currentPosition = [
        position.coords.longitude,
        position.coords.latitude,
      ];
      this.displayPosition = currentPosition;
      this.positionHistory.push(currentPosition);
    };
    let onFailed = (error) => {
      window.alert(
        "code: " + error.code + "\n" + "message: " + error.message + "\n"
      );
    };
    let options = {
      maximumAge: 3000,
      enableHighAccuracy: true,
      timeout: 5000,
    };

    let watchId = window.navigator.geolocation.watchPosition(
      onSuccess,
      onFailed,
      options
    );
    this.watchId = watchId;
  }
  watchCurrentPositionEnd() {
    console.log("end watch position");
    window.navigator.geolocation.clearWatch(this.watchId);
  }
}

let recordState = {
  namespaced: true,
  state: () => ({
    Updater: null,
    isInit: false,
    TimeAnimator: null,
    PositionAnimator: null,

    // startTime:0,
    // stopTime:0,
    // activityTime:0,

    //direct state
    watchPositionId: {},
    positionHistory: [],
    displayPosition: [35.6831925, 139.7511307],
    positionIcon: {},
    mapComponent: {},
  }),
  getters: {
    displayPosition: (state) => {
      return state.displayPosition;
    },
  },
  mutations: {},
  actions: {
    initRecordState({ state, dispatch }) {
      if (state.isInit) {
        //none
      } else {
        state.TimeAnimator = new TimeAnimator();
        state.PositionAnimator = new PositionAnimator();
        state.Updater = new Updater();
        dispatch("initTimer");
        // dispatch('initPosition')
        state.isInit = true;
      }
    },
    initTimer({ state }) {
      state.Updater.add(state.TimeAnimator);

      // console.log(state.Timer)
    },
    initPosition({ state }) {
      state.Updater.add(state.PositionAnimator);
    },

    //direct state
    initDisplayPosition({ dispatch }) {
      let options = {
        maximumAge: 3000,
        enableHighAccuracy: true,
        timeout: 50000,
      };

      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          let currentPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          dispatch("setDisplayPosition", currentPosition);
        },
        (error) => {
          console.log(("error:", error));
        },
        options
      );

      // state.displayPosition
    },
    setWatchPositionId({ state }, { id, keyName }) {
      console.log("[set] WatchPositionId");
      state.watchPositionId[keyName] = id;
    },
    setPositionHistory({ state }, { lat, lng }) {
      //記録時
      state.positionHistory.push([lat, lng]);
      state.displayPosition = [lat, lng];
    },
    setDisplayPosition({ state }, { lat, lng }) {
      console.log("[set] DisplayPosition");
      let dp = [lat, lng];
      state.displayPosition = dp;
      // L.marker(dp, { icon: state.positionIcon }).addTo(state.mapComponent);
      // state.mapComponent.setView(dp, 10);
    },
    setPositionIcon({ state }, icon) {
      console.log("[set] setPositionIcon");

      state.positionIcon = icon;
    },
    setMapComponent({ state }, mapComponent) {
      console.log("[set] setMapComponent");
      state.mapComponent = mapComponent;
    },
  },
};

export default recordState;
