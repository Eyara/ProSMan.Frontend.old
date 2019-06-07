<script>
import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins
export default {
  extends: Line,
  name: "line-chart",
  mixins: [reactiveProp],
  props: ["chartData", "options"],
  methods: {
    update() {
      this.$data._chart.update();
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
};
</script>