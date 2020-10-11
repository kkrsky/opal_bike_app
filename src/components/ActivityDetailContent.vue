<template>
  <div id="ActivityDetailContent">
    <v-container fluid>
      <v-row dense>
        <v-col>
          <div class="activity-detail-container">
            <div class="activity-header-container">
              <user-share-header></user-share-header>
            </div>
            <div class="activity-title">
              {{ cardItem.userCustomize.title }}
            </div>
            <div class="activity-map-container">
              <v-img
                :src="cardItem.testPicture"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="25vh"
              ></v-img>
            </div>

            <div class="activity-data-container">
              <!-- 走行時間 -->
              <div class="running-time-container">
                <div class="title">タイム</div>
                <div class="content">01:24:50</div>
              </div>
              <!-- 電費 -->
              <div class="power-cost-container">
                <div class="title">電費</div>
                <div class="content">60 <span class="unit">km/kw</span></div>
              </div>
              <!-- 平均速度 -->
              <div class="average-velocity-container">
                <div class="title">平均速度</div>
                <div class="content">30.9 <span class="unit">km/h</span></div>
              </div>
              <!-- 距離 -->
              <div class="running-length-container">
                <div class="title">距離</div>
                <div class="content">13.4 <span class="unit">km</span></div>
              </div>
            </div>

            <div class="activity-feeling-container">
              {{ cardItem.userCustomize.feeling }}
            </div>
            <!-- <div class="mt-5"></div> -->
            <div class="uploaded-photo-container">
              <photo-carousel
                :savePhotos="cardItem.userCustomize.savePhotos"
                isShowDetail
              ></photo-carousel>
            </div>
            <div class="activity-description">
              <v-textarea
                v-model="cardItem.userCustomize.description"
                label="活動の出来事"
                auto-grow
                outlined
                readonly
              ></v-textarea>
            </div>
            <div class="activity-ride-bike-container">
              {{ cardItem.userCustomize.rideBike }}
            </div>

            <div class="mt-5"></div>

            <div class="btn-activity-edit-container">
              <v-btn class="btn-activity-edit" outlined @click="editActivity"
                >アクティビティを編集</v-btn
              >
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import UserShareHeader from "@/components/UserShareHeader.vue";
import PhotoCarousel from "@/components/PhotoCarousel.vue";

export default {
  props: {
    userItems: {
      type: Object,
      default: () => {
        return {
          userId: null,
          displayName: "test tarou",
          displayAvatar: "https://picsum.photos/200",
          displayDescription: "this is test",
          authResult: {
            additionalUserInfo: {
              isNewUser: true,
              profile: {
                email: "tool0628@gmail.com",
                family_name: "伊藤",
                given_name: "広",
                granted_scopes:
                  "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid",
                id: "109008683200796115380",
                locale: "ja",
                name: "伊藤広",
                picture:
                  "https://lh5.googleusercontent.com/-Smv4C8fcx5Q/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuckMb5gXA6A1mnoOzyH2V4w2-i4cCw/photo.jpg",
                verified_email: true,
              },
              providerId: "google.com",
            },
            credential: {
              a: null,
              accessToken:
                "ya29a0AfH6SMCDm89jv8Osgf0n-akGv12l88SxFo7vr8B4uFTF_JHo_fDUW3Vz9g7NX92KULeelOPSClL5TxBGaJwne7AtMjbZfEYFysDdXrcXXoQj6crWWDdCJs_CBoMVgnQohUWfvfSxZfrj1ucihPxvBGAXZsAUnQufQ",
              idToken:
                "eyJhbGciOiJSUzI1NiIsImtpZC6ImJjNDk1MzBlMWZmOTA4M2RkNWVlYWEwNmJlMmNlNDM3ZjQ5YzkwNWUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMTA5MDExMTkzOTk2NC1wMGVsamlpcmozY2Zhb29nbzdjMWVpZDUxcWs3OWk2ay5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImF1ZCI6IjEwOTAxMTE5Mzk5NjQtcDBlbGppaXJqM2NmYW9vZ283YzFlaWQ1MXFrNzlpNmsuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDkwMDg2ODMyMDA3OTYxMTUzODAiLCJlbWFpbCI6InRvb2wwNjI4QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoid0RBMTgtX2phVWFRbzd4ZDg5ZFdhZyIsImlhdCI6MTU5OTIzMDM4MiwiZXhwIjoxNTk5MjMzOTgyfQ.vZtVQoCDW4RKnZTSqeIgaPOPE_GgbwH-TW-fML1kCnDdExtjMfciSzSw59IZI8C5z9bnlo1zX4tZjNjeVXE4qnB_OIxeRPq9aSiKmAdaAzqK4Zxqneslqh4eG6a_LIgfMNxoK6wG3-JIbwwnQoV9ZepSQ6ZELcDq6SKvrQLhEcHwDZcAIukz_OAseE7vx_pDub-L10Uo0iyLaEbaNOeIbTUEDaVh3L2BROPwuGkpIRdtrDT4EwRoN9ZeVN1ayV3dM9W9I0reEVOJ8PPLzo5uzg1aF-r0acAETLfSfcC7sN-ntOGMztsbwm-r7B5nRb05BQYUvQ_f3UbTtt5_csir0",
              providerId: "google.com",
              signInMethod: "google.com",
            },
            operationType: "signIn",
            user: {
              displayName: "伊藤広",
              eb: null,
              email: "tool0628@gmail.com",
              emailVerified: true,
              isAnonymous: false,
              phoneNumber: null,
              photoURL:
                "https://lh5.googleusercontent.com/-Smv4C8fcx5Q/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuckMb5gXA6A1mnoOzyH2V4w2-i4cCw/photo.jpg",
              refreshToken:
                "AE0u-Nf_PmUTc-Z3MgmuCJfa6_bvXJTAm5FgPN6e_oUPaBmQEX132ebHwBrQI2KcLmo-CIgNiFDiJH9pYIB_lKM7TaSOe4RHSe90uGUWxk-DS1dB38g5Z45xxSUH37k2Y9WPK-OtVrcIS0p3mnKufYn7yi9wPkb3atq2TLpUvp22nrpBBEVkwcz20X24Nk-5D4jsDwy11WXRqjuPantKGE_bKEMrqSM54QR_PQ8zuoMOGVNEGyISMAS6mCRNOl-BEsWFli2YLEhKrb7t5nc-1gQKKL5BXgdrGY3NGqRlGq_mt8tbUs3jkDggg_w0PyjS9ElcY51p1K2GdFKhi4aocM6_7yuwSYeGcoctEjvRidqx5ZXU_TPVHPijB4nNVzr3NC5IlXA-U9FFgjDpehcKIqwNy83ZjMPhXl08EUbhT15_ABR_y2I6m0iOP1ZHkT5RK",
              s: "opal-bike-app.firebaseapp.com",
              uid: "k7nGdDCUTHUENEAM7QQedAFbkj1",
            },
          },
        };
      },
    },
    cardItem: {
      type: Object,
      default: () => {
        return {
          cardId: 1,
          attribute: "fullActivity",
          flex: 12,
          testPicture: "https://picsum.photos/500",
          userCustomize: {
            title: "テストのライド",
            description: "I ride a bike in some",
            feeling: "good",
            rideBike: "test zirou",
            savePhotos: [
              {
                //写真にメモを付属できる
                pictureId: 1,
                title: "test1",
                description: "this is test picture 1",
                src: "https://picsum.photos/400",
                position: [134, 30],
              },
              {
                //写真にメモを付属できる
                pictureId: 2,
                title: "test2",
                description: "this is test picture 2",
                src: "https://picsum.photos/100",
                position: [134, 30],
              },
              {
                pictureId: 3,
                title: "test3",
                description: "this is test picture 3",
                src: "https://picsum.photos/100",
                position: [134, 30],
              },
              {
                pictureId: 4,
                title: "test4",
                description: "this is test picture 4",
                src: "https://picsum.photos/100",
                position: [134, 30],
              },
              {
                pictureId: 5,
                title: "test5",
                description: "this is test picture 5",
                src: "https://picsum.photos/100",
                position: [134, 30],
              },
              {
                pictureId: 6,
                title: "test6",
                description: "this is test picture 6",
                src: "https://picsum.photos/100",
                position: [134, 30],
              },
            ],
          },
          activityData: {
            runDate: "Sun Sep 27 2020 18:10:50 GMT+0900 (日本標準時)",
            runTime: 5078, //sec
            runLength: 13.4, //km
            averageVeloccity: 30.9, //km/h
            gpsData: [
              { time: 0, position: [139.7013586, 35.6875364], speed: null },
              {
                time: 1000,
                position: [139.7013586, 35.6874364],
                speed: null,
              },
              {
                time: 2000,
                position: [139.7013586, 35.6872364],
                speed: null,
              },
            ],
          },
        };
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    editActivity() {
      window.alert("編集モードに変更しました（未実装）");
    },
  },
  components: {
    UserShareHeader,
    PhotoCarousel,
  },
};
</script>

<style lang='scss' scoped>
#ActivityDetailContent {
  $font-size__here: 6vw;
  $items-padding__here: 8px;

  .activity-detail-container {
    .activity-header-container {
      padding: $items-padding__here;
      height: $__user-share-header-height;
    }
    .activity-title {
      padding: $items-padding__here;
      font-size: 1.25rem;
      font-weight: bold;
    }

    .activity-data-container {
      padding: $items-padding__here;
      $info-title-size__adjust: 0.6;

      height: 15vh;
      width: 100%;
      display: grid;
      grid-template:
        "totalTime  powerCost " 50%
        "average    length    " 50%
        /50% 50%;
      row-gap: 1vh;

      .running-time-container {
        grid-area: totalTime;
        @include activity-info-grid__card(
          $font-size__here,
          $info-title-size__adjust
        );
      }
      .power-cost-container {
        grid-area: powerCost;
        @include activity-info-grid__card(
          $font-size__here,
          $info-title-size__adjust
        );
      }
      .average-velocity-container {
        grid-area: average;
        @include activity-info-grid__card(
          $font-size__here,
          $info-title-size__adjust
        );
      }
      .running-length-container {
        grid-area: length;
        @include activity-info-grid__card(
          $font-size__here,
          $info-title-size__adjust
        );
      }
    }

    .activity-feeling-container {
      text-align: center;
      font-weight: bold;
      font-size: 2rem;
    }

    .uploaded-photo-container {
      height: 15vh;
    }

    .activity-ride-bike-container {
      text-align: center;
      font-weight: bold;
      font-size: 2rem;
    }

    .btn-activity-edit-container {
      width: 100%;
      .btn-activity-edit {
        width: 100%;
      }
    }
  }
}
</style>