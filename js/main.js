window.onload = function () {
    //select選單函數
    function show(e) {
      var selectedArea = e.target.value;
      document.querySelector(".areaName").textContent = selectedArea;
      getSpotInfo(selectedArea); //從JSON中撈出景點資訊
    }

    //點擊熱門區域函數
    function showFamous(e) {
      e.preventDefault(); //阻止冒泡事件
      var clickTarget = e.target.nodeName; //nodeName截取元素的子節點
      if (clickTarget == "A") { 
        var selectedArea = e.target.dataset.famous;
  
        document.querySelector(".areaName").textContent = selectedArea;
        getSpotInfo(selectedArea); //從JSON中撈出景點資訊
      }
    }
  
    function getSpotInfo(area) {
      var dataLen = data.length;
      var areaItem = "";
      for (var i = 0; i < dataLen; i++) {
        var notAvailable = "尚未提供"; //有些景點未提供資料
        var placeImg; //主視覺
        var placeTitle = data[i].stitle || notAvailable;
        var placeArea = data[i].address.substr(5, 3) || notAvailable;
        var placeType = data[i].CAT2 || notAvailable;
        var placeAddress = data[i].address || notAvailable;
        var placeTel = data[i].MEMO_TEL || notAvailable;
        if (data[i].address.indexOf(area) >= 0) {
          //判別行政區
          if (data[i].file.img.length === undefined) {
            //判別banner
            placeImg = data[i].file.img["#text"] || "";
          } else {
            placeImg = data[i].file.img[0]["#text"] || "";
          }
          areaItem +=
            '<li data-index="' + data[i].RowNumber + '"><img class="bigimg" src="' +
            placeImg +
            '" ><h3>' +
            placeTitle +
            "</h3><h4>" +
            placeArea +
            '</h4><div class="sights"><div class="icon1"><img src="https://img.onl/2vQevr" ><span>' +
            placeType +
            '</span></div><div class="icon2"><img src="https://img.onl/Cm3iKg" ><span>' +
            placeAddress +
            '</span></div><div class="icon3"><img src="https://img.onl/Llueut"><span>' +
            placeTel +
            '</span></div><a href="" class="detail hello">景點介紹</a></div></li>';
          list.innerHTML = areaItem;
        }
      }
    } 
    function viewBtn(e){
      e.preventDefault();
      if (e.target.nodeName === 'A' && e.target.classList.value.indexOf('detail') >= 0) {
        var detailArea = document.querySelector('.screen');
        detailArea.style.display = 'block';
        var areaIndex = e.target.parentNode.parentNode.dataset.index;
        data.forEach(function(item, index) {
          if(item.RowNumber === areaIndex) {
            var notAvailable = "尚未提供"; //有些景點未提供資料
            var placeTitle = item.stitle || notAvailable;
            var placeArea = item.address.substr(5, 3) || notAvailable;
            var placeType = item.CAT2 || notAvailable;
            var placeTel = item.MEMO_TEL || notAvailable;
            var placeAddress = item.address || notAvailable;
            var placeMrt = item.MRT;
            var placeTime = item.MEMO_TIME;
            var placeDetail = item.xbody;
            var placeImg;
            if (item.file.img.length === undefined) {
              //判別banner
              placeImg = item.file.img["#text"] || "";
            } else {
              placeImg = item.file.img[0]["#text"] || "";
            }
            // console.log();          
            document.querySelector('.view-picture').setAttribute('src', placeImg);
            document.querySelector('.view-title').innerHTML = placeTitle;
            document.querySelector('.view-area').innerHTML = placeArea;
            document.querySelector('.view-type').innerHTML = placeType;
            document.querySelector('.view-tel').innerHTML = placeTel;
            document.querySelector('.view-address').innerHTML = placeAddress;
            document.querySelector('.view-mrt').innerHTML = placeMrt;
            document.querySelector('.view-time').innerHTML = placeTime;
            document.querySelector('.view-detail').innerHTML = placeDetail;
          }
        });
      }
    }

  //全域變數
  var chooseArea = document.getElementById("chooseArea"); //選單DOM元素
  var famousArea = document.querySelector(".famousAreaLink"); //熱門景點的DOM元素
  var myButton = document.getElementById("goTop");
  var list = document.querySelector(".list"); //指定list的DOM元素
  var body = document.querySelector(".body"); //指定body的DOM元素
  var pageid = document.getElementById('pageid'); //指定分頁DOM元素
  var pageData = {};
  var defaultArea = '信義區';
  getSpotInfo(defaultArea);
 
  // console.log(body);
  //監聽按鈕
  chooseArea.addEventListener("change", show, false);
  famousArea.addEventListener("click", showFamous, false);
  myButton.addEventListener("click", goTop, false);
  
  //新增景點介紹
  body.addEventListener("click", viewBtn, false);
  window.addEventListener("click", function(e) {
    var screen = document.querySelector(".screen");
    var cancelBtn = document.querySelector(".cancel");
    if (e.target === screen || e.target === cancelBtn) {
      screen.style.display = 'none';
    }
  }, false);

  //返回頂部 
      window.onscroll = function() {scrollFunction()};
      function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
          myButton.style.display = 'block';
        }else{
          myButton.style.display = 'none';
        }       
      }
      function goTop(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }

      // fetch({method: 'get'})
      // .then((response) => {
      // return response.json();
      // }).then((data) => {
      // pageData = data.result.records;
      // pagination(pageData, 1);
// })

};
