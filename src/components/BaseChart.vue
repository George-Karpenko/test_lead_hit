<template>
  <div class="hello" ref="chartdiv"></div>
</template>

<script>
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

export default {
  name: "BaseChart",
  props: {
    title: {
      type: String,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    x: {
      type: String,
      required: true,
    },
    y: {
      type: String,
      required: true,
    },
  },
  mounted() {
    let root = am5.Root.new(this.$refs.chartdiv);

    root.numberFormatter.set("intlLocales", "ru-RU");

    var myTheme = am5.Theme.new(root);

    myTheme.rule("Grid").setAll({
      stroke: am5.color(0xffffff),
      strokeWidth: 0,
    });

    root.setThemes([myTheme, am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        layout: root.verticalLayout,
        pinchZoomX: true,
        paddingLeft: 10,
      })
    );
    chart.children.unshift(
      am5.Label.new(root, {
        text: this.title,
        fontSize: 25,
        fontWeight: "500",
        textAlign: "center",
        x: am5.percent(50),
        centerX: am5.percent(50),
        paddingTop: 0,
        paddingBottom: 0,
      })
    );

    let xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0.1,
        groupData: false,
        markUnitChange: false,
        baseInterval: {
          timeUnit: "day",
          count: 1,
        },
        renderer: am5xy.AxisRendererX.new(root, {
          strokeOpacity: 0.5,
          strokeWidth: 1,
          pan: "zoom",
        }),
        tooltip: am5.Tooltip.new(root, {}),
        startLocation: 0.5,
        // endLocation: 0.6,
      })
    );

    xAxis.get("dateFormats")["day"] = {
      month: "long",
      day: "numeric",
    };

    xAxis.get("tooltipDateFormats")["day"] = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxPrecision: 0,
        renderer: am5xy.AxisRendererY.new(root, {
          strokeOpacity: 0.5,
          strokeWidth: 1,
        }),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );
    chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        behavior: "none",
      })
    );

    let series = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: "Series",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: this.y,
        valueXField: this.x,
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}",
          dy: -5,
          dx: -5,
        }),
      })
    );

    series.strokes.template.setAll({
      strokeWidth: 2,
    });

    series.fills.template.setAll({
      visible: true,
      fillOpacity: 0.5,
    });

    series.bullets.push(function () {
      let bulletCircle = am5.Circle.new(root, {
        radius: 5,
        fill: series.get("fill"),
      });
      return am5.Bullet.new(root, {
        sprite: bulletCircle,
      });
    });

    series.data.processor = am5.DataProcessor.new(root, {
      dateFormat: "yyyy-MM-dd",
      dateFields: ["date"],
    });
    chart.set(
      "scrollbarX",
      am5.Scrollbar.new(root, {
        orientation: "horizontal",
      })
    );

    series.data.setAll(this.data);

    this.root = root;
  },

  beforeDestroy() {
    if (this.root) {
      this.root.dispose();
    }
  },
};
</script>

<style scoped>
.hello {
  width: 100%;
  height: 500px;
}
</style>
