var calenar;
let start_first;
let span_start_time = document.getElementById("start_Time");
let color;
//input 값들
let inputTitle = document.getElementById("inputTitle");
let inputSales = document.getElementById("inputSales");
let inputStart = document.getElementById("inputStart");
let inputEnd = document.getElementById("inputEnd");
let inputSiteManager = document.getElementById("inputSiteManager");
let inputAddress = document.getElementById("inputAddress");
let inputPrice = document.getElementById("inputPrice");
let inputRadio = document.getElementsByName("type");
let radioValue;
let inputSelect = document.getElementById("inputSelect");
let inputSelectEMP = document.getElementById("inputSelect_emp");
let inputSelectCustomerName = document.getElementById("inputSelectCustomerName");
// 

inputSelectCustomerName.addEventListener("change",function(){
    console.log("input title = ",inputSelectCustomerName.value);    
    inputTitle.value = inputSelectCustomerName.value;
    console.log(inputTitle.value);
})

inputSelect.addEventListener("change",function(){
    console.log("input select = ", inputSelect.value )
    inputSales.value = inputSelect.value;
})

inputSelectEMP.addEventListener("change",function(){
    inputSiteManager.value = inputSelectEMP.value;
})

function create_sch(date){
    console.log("date =  ",date);
    for(let i=0; i<inputRadio.length;i++){
        if(inputRadio[i].checked == true){
            radioValue = inputRadio[i].value;
        }    
    
    }
    fetch("/schedule/create",{
        method : "POST",
        headers: {
            "Content-Type": "application/json",
          },
        body : JSON.stringify({
            customer_Num : inputTitle.value,
            sales_Manager : inputSales.value,
            employee_Num : 2024001,
            start_Time : date + " "+inputStart.value,
            end_Time : date + " "+inputEnd.value,
            site_Type : radioValue,
            address : inputAddress.value,
            price : inputPrice.value
            })
        })
        .then(res => res.json())
        .then(res=>{
            if(res>0){
                alert("추가완료")
                location.href="/schedule/list";
            }
        })
    }


// //스케쥴 추가 펑션
//     function create_sch(date){
//         console.log("일정추가 : " + date);
//         var inputTitle = document.getElementById("inputTitle").value;
//         var inputStart = document.getElementById("inputStart").value;
//         var inputEnd = document.getElementById("inputEnd").value;
    
//         calendar.addEvent({
//         title: inputTitle,
//         start: date+'T'+inputStart,
//         end: date+'T'+inputEnd,
//         id : inputTitle+date+'T'+inputStart
//         })

//         closeModal(); // 추가 후 모달 닫기
//     // 입력 필드 초기화
//     document.getElementById("inputTitle").value = "";
//     document.getElementById("inputStart").value = "";
//     document.getElementById("inputEnd").value = "";
//     // FullCalendar 날짜 선택 해제
//         calendar.unselect(); // FullCalendar에서 날짜 선택 초기화
//         console.log("calendar unselect");
//     }


/*
    function create_sch(date){
        console.log("일정추가 : " + date);
        var inputTitle = document.getElementById("inputTitle").value;
        var inputStart = document.getElementById("inputStart").value;
        var inputEnd = document.getElementById("inputEnd").value;
    
        calendar.addEvent({
        title: inputTitle,
        start: date+'T'+inputStart,
        end: date+'T'+inputEnd,
        id : inputTitle+date+'T'+inputStart
        })

        closeModal(); // 추가 후 모달 닫기
    // 입력 필드 초기화
    document.getElementById("inputTitle").value = "";
    document.getElementById("inputStart").value = "";
    document.getElementById("inputEnd").value = "";
    // FullCalendar 날짜 선택 해제
        calendar.unselect(); // FullCalendar에서 날짜 선택 초기화
        console.log("calendar unselect");
    }
*/


document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    calendar = new FullCalendar.Calendar(calendarEl, {
        initialView : 'dayGridMonth',
        selectable : true,
        locale : "kr",
        editable: true,
        eventContent: function(arg) {
            return {
              html:  `<div style="color: ${arg.textColor};">` + '<b>' + arg.event.title + '</b></div>'
            };
          },
        eventDrop: function(info) {
                alert("일정을 이동했습니다!"); // 이벤트를 이동할 때 알림창을 띄울 수 있습니다.
        },dateClick : function(info) {
            newModal(info);

        }
        ,
        eventClick:function(info){
            console.log("event Click");
            console.log("info = " +info.event.title);
            openModal(info.event.title,info.event.start,info.event.id)
        }

    });
    calendar.render();
});

function addEventToCalendar(event) {
    calendar.addEvent(event);
}

function removeEventFromCalender(id) {
    let calenderEvent = calendar.getEventById(id);
    calenderEvent.remove();
}

/* 모달창 */
//빈 일정 클릭시
function newModal(info){
    carAllocation.selectedIndex=0; // 배차 셀렉트박스 선택 값 초기화

var modal = document.getElementById("myModal");
var modalTitle = document.getElementById("modal-title"); // 모달 타이틀 엘리먼트
let create_sch_btn = document.getElementById("create_sch_btn");
modal.style.display = "block";
modalTitle.innerText="일정 등록";

            inputEnd.value = "";
            inputStart.value = "";
            inputAddress.value = "";
            inputPrice.value ="";
            inputSales.value= "";
            inputSiteManager.value = "";
            inputTitle.value = "";
            for(let i=0;i<inputRadio.length;i++){
                inputRadio[i].checked = false;
            }


console.log(" date = == " +info.dateStr)
span_start_time.innerHTML = info.dateStr;
//일정추가

create_sch_btn.classList.remove("display_none");
create_sch_btn.addEventListener("click",function(){

    create_sch(info.dateStr);
})

//외부 공간 클릭시 닫기 
window.onclick = function(event) {
      var modal = document.getElementById("myModal");
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
    calendar.unselect();
}


// 이벤트 클릭시 
function openModal(content,date,id) {
carAllocation.selectedIndex=0; // 배차 셀렉트박스 선택 값 초기화

    


var modal = document.getElementById("myModal");
var modalTitle = document.getElementById("modal-title"); // 모달 타이틀 엘리먼트
var modalContent = document.getElementById("modal-content");
var start_Time_Date = document.getElementById("start_Time_Date");
var end_Time_Date = document.getElementById("end_Time_Date");


let create_sch_btn = document.getElementById("create_sch_btn");
let inputStart = document.getElementById("inputStart");
modal.style.display = "block";
modalTitle.innerText="일정 확인";
    let sch_ID = id.substring(id.lastIndexOf('-')+1,id.length);
        fetch("/schedule/getSchedule",{
            method : "POST",
            headers: {
                "Content-Type": "application/json",
              },
            body : JSON.stringify({
               site_Num : sch_ID
                })
        }).then(res=>res.json())
        .then(res=>{
            console.log("res===",res);
            inputEnd.value = res.end_Time.substring(11);
            inputStart.value = res.start_Time.substring(11);
            inputAddress.value = res.address;
            inputPrice.value =res.price;
            inputSales.value= res.sales_Manager;
            inputSiteManager.value = res.employee_Num;
            inputTitle.value = res.business_Name;
            for(let i=0;i<inputRadio.length;i++){
                console.log("radio",inputRadio[i].value + " //// site_type == ", res.site_Type)
                if(inputRadio[i].value == res.site_Type){
                    inputRadio[i].checked= true;
                }
            }
        })

    console.log("last index of ===== ",id.lastIndexOf('-'));
    console.log("id substr == ", id.substring(id.lastIndexOf('-')-10,id.lastIndexOf('-')))
    console.log("id length = ",id.length);
    console.log("id substring id ==== ",id.substring(id.lastIndexOf('-')+1,id.length));
    span_start_time.innerHTML = id.substring(id.lastIndexOf('-')-10,id.lastIndexOf('-'));   
  

console.log("date"+date);
console.log("id"+id);
//일정추가
create_sch_btn.classList.add("display_none");
create_sch_btn.addEventListener("click",function(){

    create_sch(date);
})

//외부 공간 클릭시 닫기 
window.onclick = function(event) {
      var modal = document.getElementById("myModal");
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
    calendar.unselect();
}
// 모달 닫기
function closeModal() {
var modal = document.getElementById("myModal");
modal.style.display = "none";
}




// 배차 요청 셀렉트박스
let carAllocation = document.getElementById("carAllocation");
function changeSelect(){
    let car_temp = carAllocation.value;
    
    if(car_temp.value != ""){
        let check = confirm(car_temp+" 차량으로 배차요청 하시겠습니까?");
        if(check == false){
            carAllocation.selectedIndex=0;
            
        }
        else{
            carAllocation.value=car_temp;
        }
    }

}


// 페이지 로드 시 db에서 값 받아오기
window.addEventListener("load",function(){
    fetch("/schedule/getList",{
        method : "GET"
    })
    .then(res => res.json())
    .then(res => {
            calendar.getEvents().forEach(function(event) {
            event.remove();
            });

            console.log("h2");
            console.log("test = ",res);
            res.forEach(element => {
               console.log("start = ", element.start_Time);
               
               start_first = element.start_Time.substr(0,10);
               console.log("start_first = ", start_first);
               console.log("site_Num === ", element.site_Num)
               let start_last = element.start_Time.substring(11,19);
                
                if(element.site_Type == '긴급') color = "red";
                else if(element.site_Type =='일반') color = "black";
                console.log("color == ", color);
                  calendar.addEvent({
                   title : element.business_Name  + element.ceo_Name,
                   start : start_first +"T"+ start_last,
                   textColor : color, 
                   end : element.end_Time,
                   id : element.ceo_Name+start_first+"-"+element.site_Num
                  })
            });
    })

})
