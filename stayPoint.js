let datas = Array(); //存放staypoint.json文件中读取的数据
$.ajax({
    url: 'staypoint.json',
    async: false,
    success: function (data) {
        datas = [].concat.apply([], data.map(function (track) {
            return track.map(function (seg) {
                return seg;
            });
        }));
    }
});

/**
 * 数据预处理
 */
function Content(type, stime, etime)
{
    this.type = type;
    this.stime = stime;
    this.etime = etime;
}

let indexes = Array();
let stayPoints = Array();
for (let i = 0; i < datas.length; i++)
{
    let s = datas[i].lng.toString() + datas[i].lat.toString();
    if ($.inArray(s, indexes) === -1)
    {
        indexes.push(s);
        let point = new BMap.Point(datas[i].lng, datas[i].lat);
        stayPoints.push(point);
    }
}

let contents = new Array(stayPoints.length);
for (let i = 0; i < contents.length; i++)
{
    contents[i] = [];
}

for (let i = 0; i < datas.length; i++)
{
    let s = datas[i].lng.toString() + datas[i].lat.toString();
    let index = indexes.indexOf(s);
    contents[index].push(new Content(datas[i].type, datas[i].stime, datas[i].etime));
}

stayPoints.forEach(function (value, index) {
    let point = new BMap.Point(value.lng, value.lat);
    let mark = new BMap.Marker(point);
    map.addOverlay(mark);

    let message = "";
    for (let j = 0; j < contents[index].length; j++)
    {
        message = message + contents[index][j].type.toString() + "/" +
            contents[index][j].stime.toString() + "/" + contents[index][j].etime.toString();
        message += "\n";
    }
    addClickHandler(message, mark);
});

function addClickHandler(message, mark)
{
    mark.addEventListener("click", function (e) {
        openInfo(message, e);
    });
}

let opts = {
    width: 300,
    height: 150,
    title: "Type/StartTime/EndTime",
    enableMessage: true
};

function openInfo(message, e) {
    let p = e.target;
    let point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
    let infoWindow = new BMap.InfoWindow(message, opts);
    map.openInfoWindow(infoWindow, point);
}