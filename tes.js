/*! Version: 0.72.0
Copyright (c) 2016 Dominik Moritz */

!(function(t, i) {
  "function" == typeof define && define.amd
    ? define(["leaflet"], t)
    : "object" == typeof exports &&
      (void 0 !== i && i.L
        ? (module.exports = t(L))
        : (module.exports = t(require("leaflet")))),
    void 0 !== i && i.L && (i.L.Control.Locate = t(L));
})(function(l) {
  function o(i, o, t) {
    (t = t.split(" ")).forEach(function(t) {
      l.DomUtil[i].call(this, o, t);
    });
  }
  function i(t, i) {
    o("addClass", t, i);
  }
  function s(t, i) {
    o("removeClass", t, i);
  }
  var t = l.Marker.extend({
      initialize: function(t, i) {
        l.Util.setOptions(this, i), (this._latlng = t), this.createIcon();
      },
      createIcon: function() {
        var t = this.options,
          i = "";
        void 0 !== t.color && (i += "stroke:" + t.color + ";"),
          void 0 !== t.weight && (i += "stroke-width:" + t.weight + ";"),
          void 0 !== t.fillColor && (i += "fill:" + t.fillColor + ";"),
          void 0 !== t.fillOpacity &&
            (i += "fill-opacity:" + t.fillOpacity + ";"),
          void 0 !== t.opacity && (i += "opacity:" + t.opacity + ";");
        var o = this._getIconSVG(t, i);
        (this._locationIcon = l.divIcon({
          className: o.className,
          html: o.svg,
          iconSize: [o.w, o.h],
        })),
          this.setIcon(this._locationIcon);
      },
      _getIconSVG: function(t, i) {
        var o = t.radius,
          s = o + t.weight,
          e = 2 * s;
        return {
          className: "leaflet-control-locate-location",
          svg:
            '<svg xmlns="http://www.w3.org/2000/svg" width="' +
            e +
            '" height="' +
            e +
            '" version="1.1" viewBox="-' +
            s +
            " -" +
            s +
            " " +
            e +
            " " +
            e +
            '"><circle r="' +
            o +
            '" style="' +
            i +
            '" /></svg>',
          w: e,
          h: e,
        };
      },
      setStyle: function(t) {
        l.Util.setOptions(this, t), this.createIcon();
      },
    }),
    e = t.extend({
      initialize: function(t, i, o) {
        l.Util.setOptions(this, o),
          (this._latlng = t),
          (this._heading = i),
          this.createIcon();
      },
      setHeading: function(t) {
        this._heading = t;
      },
      _getIconSVG: function(t, i) {
        var o = t.radius,
          s = t.width + t.weight,
          e = 2 * (o + t.depth + t.weight),
          n = "M0,0 l" + t.width / 2 + "," + t.depth + " l-" + s + ",0 z";
        return {
          className: "leaflet-control-locate-heading",
          svg:
            '<svg xmlns="http://www.w3.org/2000/svg" width="' +
            s +
            '" height="' +
            e +
            '" version="1.1" viewBox="-' +
            s / 2 +
            " 0 " +
            s +
            " " +
            e +
            '" style="' +
            ("transform: rotate(" + this._heading + "deg)") +
            '"><path d="' +
            n +
            '" style="' +
            i +
            '" /></svg>',
          w: s,
          h: e,
        };
      },
    }),
    n = l.Control.extend({
      options: {
        position: "topleft",
        layer: void 0,
        setView: "untilPanOrZoom",
        keepCurrentZoomLevel: !1,
        initialZoomLevel: !1,
        getLocationBounds: function(t) {
          return t.bounds;
        },
        flyTo: !1,
        clickBehavior: {
          inView: "stop",
          outOfView: "setView",
          inViewNotFollowing: "inView",
        },
        returnToPrevBounds: !1,
        cacheLocation: !0,
        drawCircle: !0,
        drawMarker: !0,
        showCompass: !0,
        markerClass: t,
        compassClass: e,
        circleStyle: {
          className: "leaflet-control-locate-circle",
          color: "#136AEC",
          fillColor: "#136AEC",
          fillOpacity: 0.15,
          weight: 0,
        },
        markerStyle: {
          className: "leaflet-control-locate-marker",
          color: "#fff",
          fillColor: "#2A93EE",
          fillOpacity: 1,
          weight: 3,
          opacity: 1,
          radius: 9,
        },
        compassStyle: {
          fillColor: "#2A93EE",
          fillOpacity: 1,
          weight: 0,
          color: "#fff",
          opacity: 1,
          radius: 9,
          width: 9,
          depth: 6,
        },
        followCircleStyle: {},
        followMarkerStyle: {},
        followCompassStyle: {},
        icon: "fa fa-map-marker",
        iconLoading: "fa fa-spinner fa-spin",
        iconElementTag: "span",
        circlePadding: [0, 0],
        metric: !0,
        createButtonCallback: function(t, i) {
          var o = l.DomUtil.create(
            "a",
            "leaflet-bar-part leaflet-bar-part-single",
            t
          );
          return (
            (o.title = i.strings.title),
            (o.role = "button"),
            (o.href = "#"),
            { link: o, icon: l.DomUtil.create(i.iconElementTag, i.icon, o) }
          );
        },
        onLocationError: function(t, i) {
          alert(t.message);
        },
        onLocationOutsideMapBounds: function(t) {
          t.stop(), alert(t.options.strings.outsideMapBoundsMsg);
        },
        showPopup: !0,
        strings: {
          title: "Show me where I am",
          metersUnit: "meters",
          feetUnit: "feet",
          popup: "You are within {distance} {unit} from this point",
          outsideMapBoundsMsg:
            "You seem located outside the boundaries of the map",
        },
        locateOptions: { maxZoom: 1 / 0, watch: !0, setView: !1 },
      },
      initialize: function(t) {
        for (var i in t)
          "object" == typeof this.options[i]
            ? l.extend(this.options[i], t[i])
            : (this.options[i] = t[i]);
        (this.options.followMarkerStyle = l.extend(
          {},
          this.options.markerStyle,
          this.options.followMarkerStyle
        )),
          (this.options.followCircleStyle = l.extend(
            {},
            this.options.circleStyle,
            this.options.followCircleStyle
          )),
          (this.options.followCompassStyle = l.extend(
            {},
            this.options.compassStyle,
            this.options.followCompassStyle
          ));
      },
      onAdd: function(t) {
        var i = l.DomUtil.create(
          "div",
          "leaflet-control-locate leaflet-bar leaflet-control"
        );
        (this._container = i),
          (this._map = t),
          (this._layer = this.options.layer || new l.LayerGroup()),
          this._layer.addTo(t),
          (this._event = void 0),
          (this._compassHeading = null),
          (this._prevBounds = null);
        var o = this.options.createButtonCallback(i, this.options);
        return (
          (this._link = o.link),
          (this._icon = o.icon),
          l.DomEvent.on(this._link, "click", l.DomEvent.stopPropagation)
            .on(this._link, "click", l.DomEvent.preventDefault)
            .on(this._link, "click", this._onClick, this)
            .on(this._link, "dblclick", l.DomEvent.stopPropagation),
          this._resetVariables(),
          this._map.on("unload", this._unload, this),
          i
        );
      },
      _onClick: function() {
        this._justClicked = !0;
        var t = this._isFollowing();
        if (
          ((this._userPanned = !1),
          (this._userZoomed = !1),
          this._active && !this._event)
        )
          this.stop();
        else if (this._active && void 0 !== this._event) {
          var i = this.options.clickBehavior,
            o = i.outOfView;
          switch (
            (this._map.getBounds().contains(this._event.latlng) &&
              (o = t ? i.inView : i.inViewNotFollowing),
            i[o] && (o = i[o]),
            o)
          ) {
            case "setView":
              this.setView();
              break;
            case "stop":
              if ((this.stop(), this.options.returnToPrevBounds))
                (this.options.flyTo
                  ? this._map.flyToBounds
                  : this._map.fitBounds
                ).bind(this._map)(this._prevBounds);
          }
        } else
          this.options.returnToPrevBounds &&
            (this._prevBounds = this._map.getBounds()),
            this.start();
        this._updateContainerStyle();
      },
      start: function() {
        this._activate(),
          this._event &&
            (this._drawMarker(this._map),
            this.options.setView && this.setView()),
          this._updateContainerStyle();
      },
      stop: function() {
        this._deactivate(),
          this._cleanClasses(),
          this._resetVariables(),
          this._removeMarker();
      },
      stopFollowing: function() {
        (this._userPanned = !0),
          this._updateContainerStyle(),
          this._drawMarker();
      },
      _activate: function() {
        if (
          !this._active &&
          (this._map.locate(this.options.locateOptions),
          (this._active = !0),
          this._map.on("locationfound", this._onLocationFound, this),
          this._map.on("locationerror", this._onLocationError, this),
          this._map.on("dragstart", this._onDrag, this),
          this._map.on("zoomstart", this._onZoom, this),
          this._map.on("zoomend", this._onZoomEnd, this),
          this.options.showCompass)
        ) {
          var t = "ondeviceorientationabsolute" in window;
          if (t || "ondeviceorientation" in window) {
            function i() {
              l.DomEvent.on(
                window,
                t ? "deviceorientationabsolute" : "deviceorientation",
                o._onDeviceOrientation,
                o
              );
            }
            var o = this;
            DeviceOrientationEvent &&
            "function" == typeof DeviceOrientationEvent.requestPermission
              ? DeviceOrientationEvent.requestPermission().then(function(t) {
                  "granted" === t && i();
                })
              : i();
          }
        }
      },
      _deactivate: function() {
        this._map.stopLocate(),
          (this._active = !1),
          this.options.cacheLocation || (this._event = void 0),
          this._map.off("locationfound", this._onLocationFound, this),
          this._map.off("locationerror", this._onLocationError, this),
          this._map.off("dragstart", this._onDrag, this),
          this._map.off("zoomstart", this._onZoom, this),
          this._map.off("zoomend", this._onZoomEnd, this),
          this.options.showCompass &&
            ((this._compassHeading = null),
            "ondeviceorientationabsolute" in window
              ? l.DomEvent.off(
                  window,
                  "deviceorientationabsolute",
                  this._onDeviceOrientation,
                  this
                )
              : "ondeviceorientation" in window &&
                l.DomEvent.off(
                  window,
                  "deviceorientation",
                  this._onDeviceOrientation,
                  this
                ));
      },
      setView: function() {
        if ((this._drawMarker(), this._isOutsideMapBounds()))
          (this._event = void 0), this.options.onLocationOutsideMapBounds(this);
        else if (this._justClicked && !1 !== this.options.initialZoomLevel)
          (t = this.options.flyTo ? this._map.flyTo : this._map.setView).bind(
            this._map
          )(
            [this._event.latitude, this._event.longitude],
            this.options.initialZoomLevel
          );
        else if (this.options.keepCurrentZoomLevel) {
          (t = this.options.flyTo ? this._map.flyTo : this._map.panTo).bind(
            this._map
          )([this._event.latitude, this._event.longitude]);
        } else {
          var t = this.options.flyTo
            ? this._map.flyToBounds
            : this._map.fitBounds;
          (this._ignoreEvent = !0),
            t.bind(this._map)(this.options.getLocationBounds(this._event), {
              padding: this.options.circlePadding,
              maxZoom: this.options.locateOptions.maxZoom,
            }),
            l.Util.requestAnimFrame(function() {
              this._ignoreEvent = !1;
            }, this);
        }
      },
      _drawCompass: function() {
        if (this._event) {
          var t = this._event.latlng;
          if (this.options.showCompass && t && null !== this._compassHeading) {
            var i = this._isFollowing()
              ? this.options.followCompassStyle
              : this.options.compassStyle;
            this._compass
              ? (this._compass.setLatLng(t),
                this._compass.setHeading(this._compassHeading),
                this._compass.setStyle && this._compass.setStyle(i))
              : (this._compass = new this.options.compassClass(
                  t,
                  this._compassHeading,
                  i
                ).addTo(this._layer));
          }
          !this._compass ||
            (this.options.showCompass && null !== this._compassHeading) ||
            (this._compass.removeFrom(this._layer), (this._compass = null));
        }
      },
      _drawMarker: function() {
        void 0 === this._event.accuracy && (this._event.accuracy = 0);
        var t,
          i,
          o = this._event.accuracy,
          s = this._event.latlng;
        if (this.options.drawCircle) {
          var e = this._isFollowing()
            ? this.options.followCircleStyle
            : this.options.circleStyle;
          this._circle
            ? this._circle
                .setLatLng(s)
                .setRadius(o)
                .setStyle(e)
            : (this._circle = l.circle(s, o, e).addTo(this._layer));
        }
        if (
          ((i = this.options.metric
            ? ((t = o.toFixed(0)), this.options.strings.metersUnit)
            : ((t = (3.2808399 * o).toFixed(0)),
              this.options.strings.feetUnit)),
          this.options.drawMarker)
        ) {
          var n = this._isFollowing()
            ? this.options.followMarkerStyle
            : this.options.markerStyle;
          this._marker
            ? (this._marker.setLatLng(s),
              this._marker.setStyle && this._marker.setStyle(n))
            : (this._marker = new this.options.markerClass(s, n).addTo(
                this._layer
              ));
        }
        this._drawCompass();
        var a = this.options.strings.popup;
        function h() {
          return "string" == typeof a
            ? l.Util.template(a, { distance: t, unit: i })
            : "function" == typeof a
            ? a({ distance: t, unit: i })
            : a;
        }
        this.options.showPopup &&
          a &&
          this._marker &&
          this._marker.bindPopup(h())._popup.setLatLng(s),
          this.options.showPopup &&
            a &&
            this._compass &&
            this._compass.bindPopup(h())._popup.setLatLng(s);
      },
      _removeMarker: function() {
        this._layer.clearLayers(),
          (this._marker = void 0),
          (this._circle = void 0);
      },
      _unload: function() {
        this.stop(), this._map.off("unload", this._unload, this);
      },
      _setCompassHeading: function(t) {
        !isNaN(parseFloat(t)) && isFinite(t)
          ? ((t = Math.round(t)),
            (this._compassHeading = t),
            l.Util.requestAnimFrame(this._drawCompass, this))
          : (this._compassHeading = null);
      },
      _onCompassNeedsCalibration: function() {
        this._setCompassHeading();
      },
      _onDeviceOrientation: function(t) {
        this._active &&
          (t.webkitCompassHeading
            ? this._setCompassHeading(t.webkitCompassHeading)
            : t.absolute && t.alpha && this._setCompassHeading(360 - t.alpha));
      },
      _onLocationError: function(t) {
        (3 == t.code && this.options.locateOptions.watch) ||
          (this.stop(), this.options.onLocationError(t, this));
      },
      _onLocationFound: function(t) {
        if (
          (!this._event ||
            this._event.latlng.lat !== t.latlng.lat ||
            this._event.latlng.lng !== t.latlng.lng ||
            this._event.accuracy !== t.accuracy) &&
          this._active
        ) {
          switch (
            ((this._event = t),
            this._drawMarker(),
            this._updateContainerStyle(),
            this.options.setView)
          ) {
            case "once":
              this._justClicked && this.setView();
              break;
            case "untilPan":
              this._userPanned || this.setView();
              break;
            case "untilPanOrZoom":
              this._userPanned || this._userZoomed || this.setView();
              break;
            case "always":
              this.setView();
          }
          this._justClicked = !1;
        }
      },
      _onDrag: function() {
        this._event &&
          !this._ignoreEvent &&
          ((this._userPanned = !0),
          this._updateContainerStyle(),
          this._drawMarker());
      },
      _onZoom: function() {
        this._event &&
          !this._ignoreEvent &&
          ((this._userZoomed = !0),
          this._updateContainerStyle(),
          this._drawMarker());
      },
      _onZoomEnd: function() {
        this._event && this._drawCompass(),
          this._event &&
            !this._ignoreEvent &&
            this._marker &&
            !this._map
              .getBounds()
              .pad(-0.3)
              .contains(this._marker.getLatLng()) &&
            ((this._userPanned = !0),
            this._updateContainerStyle(),
            this._drawMarker());
      },
      _isFollowing: function() {
        return (
          !!this._active &&
          ("always" === this.options.setView ||
            ("untilPan" === this.options.setView
              ? !this._userPanned
              : "untilPanOrZoom" === this.options.setView
              ? !this._userPanned && !this._userZoomed
              : void 0))
        );
      },
      _isOutsideMapBounds: function() {
        return (
          void 0 !== this._event &&
          this._map.options.maxBounds &&
            !this._map.options.maxBounds.contains(this._event.latlng)
        );
      },
      _updateContainerStyle: function() {
        this._container &&
          (this._active && !this._event
            ? this._setClasses("requesting")
            : this._isFollowing()
            ? this._setClasses("following")
            : this._active
            ? this._setClasses("active")
            : this._cleanClasses());
      },
      _setClasses: function(t) {
        "requesting" == t
          ? (s(this._container, "active following"),
            i(this._container, "requesting"),
            s(this._icon, this.options.icon),
            i(this._icon, this.options.iconLoading))
          : "active" == t
          ? (s(this._container, "requesting following"),
            i(this._container, "active"),
            s(this._icon, this.options.iconLoading),
            i(this._icon, this.options.icon))
          : "following" == t &&
            (s(this._container, "requesting"),
            i(this._container, "active following"),
            s(this._icon, this.options.iconLoading),
            i(this._icon, this.options.icon));
      },
      _cleanClasses: function() {
        l.DomUtil.removeClass(this._container, "requesting"),
          l.DomUtil.removeClass(this._container, "active"),
          l.DomUtil.removeClass(this._container, "following"),
          s(this._icon, this.options.iconLoading),
          i(this._icon, this.options.icon);
      },
      _resetVariables: function() {
        (this._active = !1),
          (this._justClicked = !1),
          (this._userPanned = !1),
          (this._userZoomed = !1);
      },
    });
  return (
    (l.control.locate = function(t) {
      return new l.Control.Locate(t);
    }),
    n
  );
}, window);
//# sourceMappingURL=L.Control.Locate.min.js.map
