var urlConfig = new Map();
urlConfig.put("sysClustGet","api/v1/sds/system/clust/get");//集群名称获取

urlConfig.put("sysClustUpdate","api/v1/sds/system/clust/update");//集群名称更新

urlConfig.put("sysIpGet","api/v1/sds/system/ip/get");//集群外部访问IP地址获取

urlConfig.put("sysIpUpdate","api/v1/sds/system/ip/update");//集群外部访问IP地址更新

urlConfig.put("sysNtpGet","api/v1/sds/system/ntp/get");//集群NTP Server获取

urlConfig.put("sysNtpList","api/v1/sds/system/ntpserver/list");//集群NTP Server 列表

urlConfig.put("sysNtpAdd","api/v1/sds/system/ntpserver/add");//新增NTP Server

urlConfig.put("sysNtpDel","api/v1/sds/system/ntpserver/delete");//删除NTP Server

urlConfig.put("sysNtpUpdate","api/v1/sds/system/ntp/update");//集群NTP Server更新

urlConfig.put("sysNodeGet","api/v1/sds/system/node/get");//集群节点列表获取

urlConfig.put("sysNodeUpdate","api/v1/sds/system/node/update");//集群节点列表更新

urlConfig.put("sysLogin","api/v1/sds/system/login");//登陆URL

urlConfig.put("sysLogout","api/v1/sds/system/logout");//系统登出URL

urlConfig.put("sysUserUpdate","api/v1/sds/system/user/update");//账号修改
urlConfig.put("getDiskReplaceMode","api/v1/sds/cluster/setting/disk/replacemode/get");//获取磁盘替换模式设置
urlConfig.put("setDiskReplaceMode","api/v1/sds/cluster/setting/disk/replacemode/update");//设置磁盘替换模式

urlConfig.put("sdsAlarmTotal","api/v1/sds/alarm/total");//集群告警数量总概

urlConfig.put("sdsomDbMode","api/v1/sds/system/dbmode/get");//集群告警数量总概

urlConfig.put("sdsomOpMode","api/v1/sds/system/opmode/get");//模式查询
urlConfig.put("setOpMode","api/v1/sds/cluster/setting/opmode/set");//模式设置

urlConfig.put("sdsAlarmList","api/v1/sds/alarm/list");//集群告警列表展示

urlConfig.put("sdsEventList","api/v1/sds/event/list");//集群事件列表展示

urlConfig.put("storageCapacity","api/v1/sds/storage/capacity");//集群存储总量查询

urlConfig.put("storageHost","api/v1/sds/storage/chost");//集群应用主机总量查询

urlConfig.put("storagePerf","api/v1/sds/storage/perf");//首页集群IOPS/集群IO宽带/平均时延
urlConfig.put("sysSmtpCfg","api/v1/sds/system/smtp/config");//配置SMTP

urlConfig.put("sysSmtpGet","api/v1/sds/system/smtp/query");//查询SMTP
//用户密码
urlConfig.put("updatePassword", "api/v1/sds/system/passWord/update");
//新增联系人
urlConfig.put("addSysEmail", "api/v1/sds/system/alert_email/add");
//修改联系人
urlConfig.put("updateSysEmail", "api/v1/sds/system/alert_email/update");
//删除联系人
urlConfig.put("deleteSysEmail", "api/v1/sds/system/alert_email/delete");
//查询联系人
urlConfig.put("querySysEmail", "api/v1/sds/system/alert_email/list");
//告警联系人Email Service服务
urlConfig.put("queryEmailService", "api/v1/sds/system/email_alert_service/status");
urlConfig.put("updateEmailService", "api/v1/sds/system/email_alert_service/switch");

//告警确认
urlConfig.put("sdsAlarmConfirm","api/v1/sds/alarm/confirm");
//告警解决
urlConfig.put("sdsAlarmResolve","api/v1/sds/alarm/resolve");
//存储池管理
urlConfig.put("queryResourcePool", "api/v1/storage/pool/query");
urlConfig.put("addResourcePool", "api/v1/storage/pool/add");
urlConfig.put("updateResourcePool", "api/v1/storage/pool/update");
urlConfig.put("deleteResourcePool", "api/v1/storage/pool/delete");
urlConfig.put("enableCephFS", "api/v1/storage/pool/addcephfs");
//获取某个存储池容量
urlConfig.put("resourcePoolCapacity", "api/v1/storage/pool/capacity");
//获取存储池下拉列表
urlConfig.put("resourcePoolList", "api/v1/storage/pool/list");
//查询默认副本数
urlConfig.put("resourcePoolStoragePolicy","api/v1/storage/pool/storage/policy");
//获取存储池详情
urlConfig.put("poolPref","api/v1/sds/storage/pool/perf");

//LUN管理
urlConfig.put("queryResourceLun", "api/v1/storage/lun/list");
urlConfig.put("addResourceLun", "api/v1/storage/lun/add");
urlConfig.put("updateResourceLun", "api/v1/storage/lun/update");
urlConfig.put("deleteResourceLun", "api/v1/storage/lun/delete");
//获取LUN详情
urlConfig.put("lunPref","api/v1/sds/storage/lun/perf");

//LUN列表下快照管理
urlConfig.put("queryAllSnapshot","api/v1/sds/storage/snapshot/list");//查询所有
urlConfig.put("addSnapshot","api/v1/sds/storage/snapshot/add");//添加
urlConfig.put("rollbackSnapshot","api/v1/sds/storage/snapshot/rollback");//修改
urlConfig.put("updateSnapshot","api/v1/sds/storage/snapshot/update");//修改
urlConfig.put("deleteSnapshot","api/v1/sds/storage/snapshot/delete");//删除

//获取创建进程
urlConfig.put("getProgress","api/v1/sds/system/progress/get");

//获取节点个数（首页，包括正常和故障）
urlConfig.put("getSysNodes","api/v1/sds/nodes/status");
//获取集群硬件信息
urlConfig.put("getSysHard","api/v1/sds/hardware/status");
//获取节点详细信息,前后视图
urlConfig.put("getSysHardView","api/v1/sds/cluster/hardware/current_status");
//请求TOP节点
urlConfig.put("top3node", "api/v1/sds/cluster/hardware/monitor");
//集群硬件详细信息
urlConfig.put("nodeStatus","api/v1/sds/hardware/status");

//集群CPU使用详情,        通过请求参数区分不同请求类型
urlConfig.put("nodeCpu","api/v1/sds/cluster/hardware/performance");
//集群内存使用
urlConfig.put("nodeMemory","api/v1/sds/cluster/hardware/performance");
//磁盘容量详情
urlConfig.put("nodeDisk","api/v1/sds/cluster/hardware/performance");
//集群IOPS详情
urlConfig.put("nodeIops","api/v1/sds/cluster/hardware/performance");
//集群吞吐量性能
urlConfig.put("nodeMbps","api/v1/sds/cluster/hardware/performance");

//存储池授权管理, add by masi 20150417
urlConfig.put("addPoolAcl", "api/v1/storage/pool/acl_add");
urlConfig.put("queryPoolAcl", "api/v1/storage/pool/acl_query");
urlConfig.put("updatePoolAcl", "api/v1/storage/pool/acl_update");
urlConfig.put("deletePoolAcl", "api/v1/storage/pool/acl_delete");
urlConfig.put("deleteInitiator", "api/v1/storage/pool/initiator_delete");
urlConfig.put("addInitiator", "api/v1/storage/pool/initiator_add");

//节点授权信息查询
urlConfig.put("queryLicense","api/v1/sds/hardware/license/query");
//更新节点授权信息
urlConfig.put("updateLicense","api/v1/sds/hardware/license/update");
/******************************************************************
    * 第三期API
    * ----------------------------------------------------------------
    */
//业务IP获取
urlConfig.put("netBussGet", "api/v1/sds/hardware/node/network/bussiness/get");
//业务IP更新
urlConfig.put("netBussUpdate", "api/v1/sds/hardware/node/network/bussiness/update");
//OM业务IP获取
urlConfig.put("omNetBussGet", "api/v1/sds/system/om/network/bussiness/get");
//OM业务IP更新
urlConfig.put("omNetBussUpdate", "api/v1/sds/system/om/network/bussiness/update");
//获取现有节点信息
urlConfig.put("nodeConfGet", "api/v1/sds/hardware/node/configuration/get");
//扫描新节点
urlConfig.put("nodeDiscover", "api/v1/sds/hardware/node/discover");
//新增新节点
urlConfig.put("nodeAdd", "api/v1/sds/hardware/node/add");
//获取进度
urlConfig.put("nodeProgGet", "api/v1/sds/system/progress/get");
//获取日志列表
urlConfig.put("sdsClusterLog", "api/v1/sds/cluster/file/log_list");
//删除日志
urlConfig.put("deleteSdsClusterLog", "api/v1/sds/cluster/file/log_delete");
//创建日志
urlConfig.put("createSdsClusterLog", "api/v1/sds/cluster/file/log_create");
//下载日志
urlConfig.put("sdsLogDownload","api/v1/sds/cluster/file/log_download");

//更改硬盘灯状态
urlConfig.put("nodeDiskLightTurn","api/v1/sds/hardware/disk/light/turn");

//创建chap
urlConfig.put("addPoolChap", "api/v1/storage/pool/chap_add");
//获取chap列表
urlConfig.put("queryPoolChap", "api/v1/storage/pool/chap_query");
//删除chap
urlConfig.put("deletePoolChap", "api/v1/storage/pool/chap_delete");
//获取磁盘拔插状态
urlConfig.put("checkoutDisk","api/v1/sds/node/hardware/disk/checkout");
//替换硬盘
urlConfig.put("swapDisk","api/v1/sds/node/hardware/disk/swap");
//添加磁盘扩容
urlConfig.put("addDisk","api/v1/sds/node/hardware/disk/add");
//获取rebalance时间
urlConfig.put("getRebalance","api/v1/sds/cluster/setting/rebalance/get");
//更新rebalance时间
urlConfig.put("updateRebalance","api/v1/sds/cluster/setting/rebalance/update");

//节点时间设置 added by hosfore 20160225
urlConfig.put("setNodeTime", "api/v1/sds/node/time/set");
//多节点时间获取
urlConfig.put("getNodeListTime", "api/v1/sds/nodelist/time/get");
//集群节点时间同步
urlConfig.put("syncClusterNodeTime", "api/v1/sds/cluster/time/sync");
