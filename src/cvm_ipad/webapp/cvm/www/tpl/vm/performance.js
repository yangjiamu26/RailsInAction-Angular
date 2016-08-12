myApp.onPageInit("vm-performance", function(page) {
  function ViewModel(){
    this.name = ko.observable(page.query.name);

    this.loadData = function(){
      var calendarRange = myApp.calendar({
          input: '#vmPerformanceDate',
          dateFormat: 'yyyy.mm.dd',
          rangePicker: true,
          monthNames: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
          dayNames: ['周日','周一','周二','周三','周四','周五','周六'],
          dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六']
      });
      RestServiceJs(BASE_URL+"/vm/"+page.query.id+"/statics").query({"dcId":CVM_PAD.dcId,"hypervisor":page.query.hypervisor},function(data){
        var startTime = Number(data.meta.start+"000");
        var endTime = Number(data.meta.end+"000");
        console.log(new Date(startTime))
        console.log(new Date(endTime))
        var xAxis = [];
        var memory = {
              "name":"内存使用率",
              "data":[]
            }
        var cpus = [];
        var cpu = {
              "name":"CPU使用率",
              "data":[]
            }
        var memoryIndex = 0;
        $.each(data.meta.legend,function(index,val){
          if(val.indexOf('cpu')>47){
            var val = val.slice(48);
            cpus.push({
              "name":val+"使用率",
              "data":[]
            })
          }
          if(val.indexOf('memory')>47){
            memoryIndex = index;
          }
        });
        for(var i=0;i<data.data.length;i++){
          memory.data.push(data.data[i].v[memoryIndex]);
          xAxis.push(data.data[i].t);
          cpu.data[i] = 0;
          $.each(cpus,function(index,val){
            cpus[index].data.push(data.data[i].v[index]);
            cpu.data[i] = cpu.data[i] + Number(data.data[i].v[index]);
          });
          cpu.data[i] = cpu.data[i]/cpus.length;
        }
        console.log(cpu)
        initMemoryUse_chart();
        initcpuUse_chart1();
        initcpuUse_chart2();
      }); 
    };
  }
  var viewModel = new ViewModel();
  ko.applyBindings(viewModel, $$(page.container)[0]);

  viewModel.loadData();

});