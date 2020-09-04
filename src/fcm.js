let fcmObj = {
  init() {
    FirebasePlugin.onMessageReceived(
      this.onFcmReceived,
      this.onFcmReceivedError
    );
    FirebasePlugin.onTokenRefresh(
      this.onFcmTokenRefresh,
      this.onFcmTokenRefreshError
    );
    this.checkNotificationPermission(false);
  },
  start() {},
  getToken() {
    FirebasePlugin.getToken(
      (token) => {
        console.log("Got FCM token: " + token);
        // news トピックの購読
        FirebasePlugin.subscribe("news");
      },
      (error) => console.error("Failed to get FCM token", error)
    );
  },
  onFcmReceived(message) {
    // メッセージ受信
    console.log("onMessageReceived");
    console.log({ message });
  },
  onFcmReceivedError(error) {
    // メッセージ受信
    console.log("onMessageReceived");
    console.error({ error });
  },

  onFcmTokenRefresh(token) {
    // トークンの更新
    console.log("onTokenRefresh");
    console.log({ token });
  },
  onFcmTokenRefreshError(error) {
    // トークンの更新
    console.log("onTokenRefresh");
    console.error({ error });
  },
  checkNotificationPermission(requested) {
    FirebasePlugin.hasPermission((hasPermission) => {
      if (hasPermission) {
        // プッシュ通知の権限 あり
        console.log("Remote notifications permission granted");
        // トークンの取得
        this.getToken();
      } else if (!requested) {
        // プッシュ通知の権限 要求
        console.log("Requesting remote notifications permission");
        let that = this;
        FirebasePlugin.grantPermission(
          that.checkNotificationPermission.bind(this, true)
        );
      } else {
        console.error("Notifications won't be shown as permission is denied");
      }
    });
  },
};

export default fcmObj;
