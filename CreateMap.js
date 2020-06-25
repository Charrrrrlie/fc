/**
 * 创建地图实例并初始化
 * 设置中心点坐标和地图级别，允许滚轮缩放，添加导航缩放
 */
let map = new BMap.Map("container");          // 创建地图实例
let point = new BMap.Point(123.38333, 41.79800);            //沈阳  123.38333 41.80000

map.centerAndZoom(point, 13);             // 初始化地图，设置中心点坐标和地图级别
map.enableScrollWheelZoom();          // 允许滚轮缩放
map.addControl(new BMap.NavigationControl());  //添加导航缩放
map.addControl(new BMap.ScaleControl({anchor: BMAP_ANCHOR_BOTTOM_RIGHT})); //右下角添加比例尺

let mapStyle = {features:['road','building','water','land'],style:'grayscale'};
map.setMapStyle(mapStyle);