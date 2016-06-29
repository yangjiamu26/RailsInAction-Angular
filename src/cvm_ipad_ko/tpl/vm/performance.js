myApp.onPageInit("vm-performance", function(page) {
  var calendarRange = myApp.calendar({
      input: '#vmPerformanceDate',
      dateFormat: 'yyyy.mm.dd',
      rangePicker: true,
      monthNames: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
      dayNames: ['周日','周一','周二','周三','周四','周五','周六'],
      dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六']
  });     
  initMemoryUse_chart();
  initcpuUse_chart1();
  initcpuUse_chart2();    
});