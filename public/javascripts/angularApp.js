'use strict';
var app = angular.module('bt1', ['ui.router']);
var update = 1;
var sanbaydi = "";
var sanbayden = "";
var ngaybay1 = "";
var ngaybay2 = "";
var listFlighs_temp1 = [];
var listFlighs_temp2 = [];
var dia_danh_di = "";
var dia_danh_den = "";
var isKhuHoi = true;
var stt = 0;
var chooseFlight = [];
var sohanhkhach = 0;
var tongtien = 0;
var madatcho;
var thong_tin_ve = [];
var dat_ve = {};
var adminMode = 0;

app.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: '/templates/home.html',
                controller: 'MainCtrl',
            })
            .state('listflighs', {
                url: '/listflighs',
                templateUrl: '/templates/list_flight.html',
                controller: 'FlightCtrl',
            })
            .state('infoCustomer', {
                url: '/infocustomer',
                templateUrl: '/templates/passenger.html',
                controller: 'PassengerCtrl',
            })
            .state('payment', {
                url: '/payment',
                templateUrl: '/templates/payment.html',
                controller: 'paymentCtrl',
            })
            .state('confirmBooking', {
                url: '/confirm',
                templateUrl: '/templates/confirm.html',
                controller: 'confirmCtrl',
            })
            .state('flightschedule', {
                url: '/flightschedule',
                templateUrl: '/templates/flightschedule.html',
                controller: 'FlightScheduleCtrl',
            })
            .state('flight', {
                url: '/flight',
                templateUrl: '/templates/flight.html',
                controller: 'FlightAdminCtrl'

            })
            .state('ticketmanage', {
                url: '/ticketmanage',
                templateUrl: '/templates/ticketmanage.html',
                controller: 'TicketCtrl',
            })
        $urlRouterProvider.otherwise('home');
        // body...
    }
]);

var isRefresh = false;

function loadData(scope, http) {
    if (!isRefresh) {

        isRefresh = true;
    }
    scope.listFlights = [];
    thong_tin_ve = [];
    chooseFlight = [];
    listFlighs_temp1 = [];
    listFlighs_temp2 = [];
    dat_ve = {};
    isKhuHoi = true;

    document.getElementById("onl_booking").style.display = "inline-block";
    http.get('/airports')
        .success(function(data) {
            for (var i = 0; i < data.length; i++) {
                var item = {};
                item.Ma = data[i].Ma;
                item.TenDiaDanh = data[i].TenDiaDanh;
                item.TenSanBay = data[i].TenSanBay;
                item.SanBayDen = data[i].SanBayDen;
                scope.listFlights.push(item);
            }
            scope.text = item;
            //console.log(data);
        })
        .error(function(data, status) {
            scope.text = "Error: " + data;
        });
}

function loadFlights(scope, http) {
    scope.listFlights = [];
    http.get('/flights')
        .success(function(data) {
            for (var i = 0; i < data.length; i++) {
                var item = {};
                item.Ma = data[i].Ma;
                item.Ngay = data[i].Ngay;
                item.Gio = data[i].Gio;
                item.ThoiGianBay = data[i].ThoiGianBay;
                item.ThongTinVe = data[i].ThongTinVe;
                scope.listFlights.push(item);
            }
        })
        .error(function(data, status) {
            //scope.text = "Error: " + data;
        });
}

function loadFlightInfo(scope, http) {
    scope.flightsInfo = [];
    http.get('/flights/info')
        .success(function(data) {
            for (var i = 0; i < data.length; i++) {
                var item = {};
                item.Ma = data[i].Ma;
                item.NoiDi = data[i].NoiDi;
                item.NoiDen = data[i].NoiDen;
                item.QuaCanh = data[i].QuaCanh;
                scope.flightsInfo.push(item);
            }
        })
        .error(function(data, status) {
            //scope.text = "Error: " + data;
        });
}

function loadTickets(scope, http, flight, date) {
    scope.Tickets = [];
    http.get('/tickets?flight=' + flight + '&date=' + date)
        .success(function(data) {
            for (var i = 0; i < data.length; i++) {
                var item = {};
                item.MaThongTin = data[i].MaThongTin;
                item.MaLoaiVe = data[i].MaLoaiVe;
                item.LoaiVe = data[i].Hang;
                item.MucGia = data[i].MucGia;
                item.SoLuong = data[i].SoLuong;
                item.GiaBan = data[i].GiaBan;
                item.MaCB = flight;
                item.Ngay = date;
                scope.Tickets.push(item);
            }
        })
        .error(function(data, status) {
            var test = "test";
        });
}

function loadBooking(scope, http) {
    scope.bookingList = [];
    http.get('/booking')
        .success(function(data) {
            for (var i = 0; i < data.length; i++) {
                var item = {};
                item.Ma = data[i].Ma;
                item.ThoiGianDatCho = data[i].ThoiGianDatCho;
                item.TongTien = data[i].TongTien;
                item.TrangThai = data[i].TrangThai;
                scope.bookingList.push(item);
            }
        });
}

app.controller('MainCtrl', ['$scope', '$http', function($scope, $http) {

    adminMode = 0;
    loadData($scope, $http);
    /* console.log('click');
     $scope.click = function() {
        $scope.text= 'click';

     };*/


    $(document).ready(function() {

        $("#example1").datepicker({
             startDate: new Date()
        });
        $("#example2").datepicker({
             startDate: new Date()
        });

    });

    $scope.change_type = function(a) {
        if (a == 0) {
            document.getElementById("khuhoi").className += " btn-info";
            document.getElementById("motchieu").className -= " btn-info";
            document.getElementById("motchieu").className += " btn_in_form";
            document.getElementById("motchieu").className += " btn btn-default";

            document.getElementById("example2").style.display = "inline-block";
            document.getElementById("arrow").src = "images/arrow2.png";

            isKhuHoi = true;
        } else {
            document.getElementById("khuhoi").className -= " btn-info";
            document.getElementById("khuhoi").className += " btn_in_form";
            document.getElementById("khuhoi").className += " btn btn-default";
            document.getElementById("motchieu").className += " btn-info";
            document.getElementById("example2").required = false;
            document.getElementById("example2").style.display = "none";

            document.getElementById("arrow").src = "images/arrow1.png";

            isKhuHoi = false;
        }

    }

    $scope.chooseSanBayDi = function(flight) {
        document.getElementById("menu1").value = flight.TenDiaDanh;
        $scope.listDesAirports = [];
        sanbaydi = flight.Ma;
        dia_danh_di = flight.TenDiaDanh;
        $http.get('/airports/' + flight.Ma)
            .success(function(data) {
                for (var i = 0; i < data.length; i++) {
                    var item = {};
                    item.NoiDen = data[i].NoiDen;
                    item.TenDiaDanh = data[i].TenDiaDanh;
                    $scope.listDesAirports.push(item);
                }
                $scope.text = item;
                //console.log(data);
            })
            .error(function(data, status) {
                $scope.text = "Error: " + data;
            });
    }

    $scope.display_name = function(flight, a) {
        document.getElementById("menu2").value = flight.TenDiaDanh;
        sanbayden = flight.NoiDen;
        dia_danh_den = flight.TenDiaDanh;
    }

    $scope.display_type = function(type) {
        document.getElementById("menu3").value = type;
    }


    $scope.find_flights = function() {
        var str = document.getElementById("example1").value;
        sohanhkhach = document.getElementById("sohanhkhach").value;

        listFlighs_temp1 = [];
        listFlighs_temp2 = [];
        var length1 = 0,
            length2 = 0;
        //var result = str.split("-");
        ngaybay1 = str;

        $http.get('/flights/search/?from=' + sanbaydi + '&to=' + sanbayden + '&date=' + ngaybay1 + '&amount=' + sohanhkhach)
            .success(function(data) {
                document.getElementById("onl_booking").style.display = "none";
                length1 = data.length;
                if (length1 == 0) {
                    alert("Không còn vé cho chiều đi");
                    if (!isKhuHoi) {
                        alert("Không còn vé cho chiều đi");
                        window.location.href = "/";
                    }
                }
                for (var i = 0; i < data.length; i++) {
                    var item = {};
                    item.Ma = data[i].Ma;
                    item.Ngay = data[i].Ngay;
                    item.Gio = data[i].Gio;
                    item.ThoiGianBay = data[i].ThoiGianBay;
                    item.Hang = data[i].Hang;
                    item.MucGia = data[i].MucGia;
                    item.GiaBan = data[i].GiaBan;
                    item.SoLuong = data[i].SoLuong;
                    item.MaVe = data[i].MaVe;
                    listFlighs_temp1.push(item);
                }
            })
            .error(function(data, status) {
                $scope.text = "Error: " + data;
            });

        if (isKhuHoi) {
            var str2 = document.getElementById("example2").value;
            ngaybay2 = str2;

            $http.get('/flights/search/?from=' + sanbayden + '&to=' + sanbaydi + '&date=' + ngaybay2 + '&amount=' + sohanhkhach)
                .success(function(data) {
                    document.getElementById("onl_booking").style.display = "none";
                    console.log();
                    length2 = data.length;
                    if (length2 == 0) {
                        alert("Không còn vé cho chiều về");
                        if (length1 == 0) {
                            window.location.href = "/";
                        }
                    }

                    for (var i = 0; i < data.length; i++) {
                        var item = {};
                        console.log(data[i].Ngay);
                        item.Ma = data[i].Ma;
                        item.Ngay = data[i].Ngay;
                        item.Gio = data[i].Gio;
                        item.ThoiGianBay = data[i].ThoiGianBay;
                        item.Hang = data[i].Hang;
                        item.MucGia = data[i].MucGia;
                        item.GiaBan = data[i].GiaBan;
                        item.SoLuong = data[i].SoLuong;
                        item.MaVe = data[i].MaVe;
                        listFlighs_temp2.push(item);
                    }
                })
                .error(function(data, status) {
                    $scope.text = "Error: " + data;
                });
        }
    }



    /*  var currentTab = 'tab1';
      $scope.changeState = function(s)
      {
         $('#' + currentTab).removeClass("active");
         $('#' + s).addClass("active");
         currentTab = s;
      }*/


}]);

function GetData(scope, http) {
    scope.data = [];
    var tam = [];
    var i = 1;

    tam.push(listFlighs_temp1);
    tam.push(dia_danh_di);
    tam.push(dia_danh_den);
    tam.push(ngaybay1);
    tam.push(i);
    scope.data.push(tam);

    if (isKhuHoi) {
        var tam1 = [];
        i = 2;
        tam1.push(listFlighs_temp2);
        tam1.push(dia_danh_den);
        tam1.push(dia_danh_di);
        tam1.push(ngaybay2);
        tam1.push(i);
        scope.data.push(tam1);
    }
}

var oldchoose = 0;
app.controller('FlightCtrl', ['$scope', '$http', function($scope, $http) {
    GetData($scope, $http);
    var isChoose = false;
    var chooseItem = [];
    $scope.choose = function(flight, iForm) {
        document.getElementById("btn_dat_ve").disabled = true;
        if (chooseItem.length > 0) {
            for (var i = 0; i < chooseItem.length; i++) {
                if (chooseItem[i] == iForm) {
                    chooseFlight.splice(chooseFlight.indexOf(flight), 1);
                    chooseItem.splice(chooseItem.indexOf(iForm), 1);
                }

            }
        }
        oldchoose = iForm;
        chooseItem.push(iForm);
        chooseFlight.push(flight);
        isChoose = false;
        if ((!isKhuHoi && chooseFlight.length == 1) || ((isKhuHoi && chooseFlight.length == 2)))
            document.getElementById("btn_dat_ve").disabled = false;
    }

    $scope.booking = function() {
        tongtien = 0;
        $http.get('/tickets/info')
            .success(function(data) {
                $scope.text = "Get successful";
                stt = data[0].counter + 1;
                madatcho = lpad(stt, 6);
                var today = new Date();
                dat_ve.Ma = madatcho;
                dat_ve.ThoiGianDatCho = today.toISOString().toString();

                for (var i = 0; i < chooseFlight.length; i++) {
                    tongtien += chooseFlight[i].GiaBan;
                    var temp = {};
                    temp.MaVe = chooseFlight[i].MaVe;
                    temp.MucGia = chooseFlight[i].MucGia;
                    temp.SoLuong = chooseFlight[i].SoLuong - sohanhkhach;
                    temp.GiaBan = chooseFlight[i].GiaBan;

                    thong_tin_ve.push(temp);
                }
                tongtien = tongtien * sohanhkhach;
                dat_ve.TongTien = tongtien;
                dat_ve.TrangThai = 0;

                $http.put('/booking', dat_ve)
                    .success(function(data) {
                        $scope.text = "Update successful";

                        for (var i = 0; i < chooseFlight.length; i++) {
                            var item1 = {};
                            item1.MaDatCho = madatcho;
                            item1.MaChuyenBay = chooseFlight[i].Ma;
                            item1.Ngay = chooseFlight[i].Ngay;
                            item1.Hang = chooseFlight[i].Hang;
                            item1.MucGia = chooseFlight[i].MucGia;
                            item1.GiaBan = chooseFlight[i].GiaBan;

                            console.log(item1.Ngay);

                            $http.post('/flights/detail', item1)
                                .success(function(data) {
                                    $scope.text = "Update successful";
                                })
                                .error(function(data, status) {
                                    $scope.text = "Error: " + data;
                                });
                        }
                    })
                    .error(function(data, status) {
                        $scope.text = "Error: " + data;
                    });
            })
            .error(function(data, status) {
                $scope.text = "Error: " + data;
            })


    }
}]);

function lpad(value, padding) {
    var zeroes = new Array(padding + 1).join("0");
    return (zeroes + value).slice(-padding);
}

function creationInfoForm() {
    var i = 1;
    while (i < sohanhkhach) {
        // $("#infomation").clone().appendTo(".tongquat");
        var r = "'" + 'danhxung' + i.toString() + "'";
        var str = "<div id='infomation" + i.toString() + "' style='margin-top: 20px;'>" + "<div style='position: relative; float: left; margin-left: 100px;'>" + "<p style='font-weight: bold;'>Danh xưng</p>" + "<div class='dropdown pull-left' style='position: relative;'>" + "<input type='text' class='btn btn-default dropdown-toggle' type='button' id='danhxung" + i.toString() + "' data-toggle='dropdown' readonly required style='width: 75px;'>" + "<span class='caret'></span>" + "<ul class='dropdown-menu' role='menu' aria-labelledby='danhxung" + i.toString() + "'>" + "<li role='presentation'><a role='menuitem' tabindex='-1' onclick= " + "\"chooseDanhXung(" + r + ", 'MR')\"" + ">MR</a></li>" + "<li role='presentation'><a role='menuitem' tabindex='-1' onclick=" + "\"chooseDanhXung(" + r + " , 'MS')\"" + ">MS</a></li>" + "</ul>" + "</div>" + "</div>" + "<div style='display: inline-block; margin-left: 10px;'>" + "<p style='font-weight: bold;'>Đệm và Tên</p>" + "<input type='text' id='demvaten" + i.toString() + "' data-toggle='dropdown' required style='height: 33px'>" + "</div>" + "<div style='display: inline-block; margin-left: 10px;'>" + "<p style='font-weight: bold;'>Họ</p>" + "<input type='text' id='ho" + i.toString() + "' data-toggle='dropdown' required style='height: 33px'>" + "</div>" + "</div>";
        var t = "#infomation" + (i - 1).toString();
        $(str).insertAfter(t);
        ++i;
    }



}

var iscall = false;
app.controller('PassengerCtrl', ['$scope', '$http', function($scope, $http) {
    adminMode = 0;
    if (iscall == false) {
        creationInfoForm();
        iscall = true;
    }

    var listPassenger = [];
    $scope.insertPassenger = function() {
        for (var i = 0; i < sohanhkhach; i++) {
            var item = {};
            item.MaDatCho = madatcho;
            item.DanhXung = document.getElementById("danhxung" + i.toString()).value;
            item.Ho = document.getElementById("ho" + i.toString()).value;
            item.Ten = document.getElementById("demvaten" + i.toString()).value;

            $http.put('/passengers', item)
                .success(function(data) {
                    $scope.text = "Insert successful";
                })
                .error(function(data, status) {
                    $scope.text = "Error: " + data;
                });
        }
    }
}]);

function GetTongTien(scope) {
    scope.tong_tien = tongtien;
}

app.controller('paymentCtrl', ['$scope', '$http', function($scope, $http) {
    adminMode = 0;
    GetTongTien($scope);

    $scope.confirm = function() {
        $http.put('/booking/' + dat_ve.Ma, dat_ve)
            .success(function(data) {
                $scope.text = "Update successful";
                for (var i = 0; i < thong_tin_ve.length; i++) {
                    var item = thong_tin_ve[i];
                    $http.put('/tickets/info', item)
                        .success(function(data) {
                            $scope.text = "Update thong_tin_ve successful";
                        })
                        .error(function(data, status) {
                            $scope.text = "Error: " + data;
                        });
                }

            })
            .error(function(data, status) {
                $scope.text = "Error: " + data;
            });

    }
}]);

app.controller('confirmCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.RefreshPage = function() {
        isRefresh = false;
                location.reload();
    }
}]);

//-------------------------------------------------------------------------------------

app.controller('AdminCtrl', ['$scope', '$http', function($scope, $http) {
    var currentTab = 'tab1';
    $scope.changeState = function(s) {
        $('#' + currentTab).removeClass("active");
        $('#' + s).addClass("active");
        currentTab = s;
    }

    $scope.isUpdate = function() {
        if (update == 1) return true;
        return false;
    };

    $scope.dismissModal = function(s) {
        $('#' + s).modal('hide');
    };
    $scope.isAdmin = function() {
        if (adminMode == 1) return true;
        return false;
    }
}]);

app.controller('TicketCtrl', ['$scope', '$http', function($scope, $http) {
    $('#flight').hide();
    adminMode = 1;
    $scope.changeViewMode = function(s) {
        if (s == '1') {
            $('#viewMode').text('Xem theo mã đặt chỗ');
            $('#flight').hide();
            $('#code').show();
        } else {
            $('#viewMode').text('Xem theo chuyến bay');
            $('#flight').show();
            $('#code').hide();

            loadFlights($scope, $http);
        }
    }

    loadBooking($scope, $http);
    $scope.viewTicket = function(id) {
        $scope.Tickets = [];
        $http.get('/booking/info?id=' + id)
            .success(function(data) {
                for (var i = 0; i < data.length; i++) {
                    var item = {};
                    item.MaChuyenBay = data[i].MaChuyenBay;
                    item.Ngay = data[i].Ngay;
                    item.Hang = data[i].Hang;
                    item.MucGia = data[i].MucGia;
                    item.GiaBan = data[i].GiaBan;
                    $scope.Tickets.push(item);
                }
            })
            .error(function(data, status) {
                var test = "test";
            });
    }

    $scope.viewPassenger = function(id) {
        $scope.Passengers = [];
        $http.get('/passengers?id=' + id)
            .success(function(data) {
                for (var i = 0; i < data.length; i++) {
                    var item = {};
                    item.DanhXung = data[i].DanhXung;
                    item.Ho = data[i].Ho;
                    item.Ten = data[i].Ten;
                    $scope.Passengers.push(item);
                }
            })
            .error(function(data, status) {
                var test = "test";
            });
    }
    $scope.viewTicketByFlight = function(flight, date) {
        $scope.Tickets = [];
        $http.get('/booking/infobyflight?flight=' + flight + '&date=' + date)
            .success(function(data) {
                for (var i = 0; i < data.length; i++) {
                    var item = {};
                    item.MaDatCho = data[i].MaDatCho;
                    item.Hang = data[i].Hang;
                    item.MucGia = data[i].MucGia;
                    item.GiaBan = data[i].GiaBan;
                    $scope.Tickets.push(item);
                }
            })
            .error(function(data, status) {
                var test = "test";
            });
    }
}]);


app.controller('FlightAdminCtrl', ['$scope', '$http', function($scope, $http) {

    adminMode = 1;
    loadFlightInfo($scope, $http);


    $scope.fillUpdate = function(id) {
        $scope.title = "Chỉnh sửa";
        update = 1;
        document.getElementById("id").value = $scope.flightsInfo[id].Ma;
        document.getElementById("start").value = $scope.flightsInfo[id].NoiDi;
        document.getElementById("end").value = $scope.flightsInfo[id].NoiDen;
        $scope.sid = $scope.flightsInfo[id].Ma;
    }

    $scope.updateFlight = function(id) {
        var temp = {};
        temp.MaCB = id;
        temp.MaCBMoi = document.getElementById("id").value;
        temp.NoiDi = document.getElementById("start").value;
        temp.NoiDen = document.getElementById("end").value;
        $http.put('/flights/info', temp)
            .success(function(data) {
                //$scope.text = "Update successful";
                if (data['status'] == 0) {
                    loadFlightInfo($scope, $http);
                    alert('Cập nhật thành công');
                } else alert('Có lỗi xảy ra khi cập nhật chuyến bay. Có thể do chuyến bay này đã tồn tại hoặc mã sân bay không tồn tại.');

            })
            .error(function(data, status) {
                //$scope.text = "Error: " + data;
                var test = "dfsdfs";
            });
    }

    $scope.fillInsert = function() {
        update = 0;
        $scope.title = "Thêm chuyến bay";

        document.getElementById("id").value = "";
        document.getElementById("start").value = "";
        document.getElementById("end").value = "";

    }

    $scope.insertFlight = function() {
        if (document.getElementById("id").value != '') {
            var temp = {};
            temp.Ma = document.getElementById("id").value;
            temp.NoiDi = document.getElementById("start").value;
            temp.NoiDen = document.getElementById("end").value;
            $http.post('/flights/info', temp)
                .success(function(data) {
                    //$scope.text = "Update successful";
                    if (data['status'] == 0) {
                        loadFlightInfo($scope, $http);
                        alert('Thêm mới thành công');
                    } else alert('Có lỗi xảy ra khi thêm chuyến bay. Có thể do bạn điền thiếu thông tin hoặc do chuyến bay này đã tồn tại.');

                })
                .error(function(data, status) {
                    //$scope.text = "Error: " + data;
                    var test = "dfsdfs";
                });
        } else {
            //$scope.text = "ID can not be null";

        }
    };

    $scope.deleteFlight = function(flight) {
        $http.delete('/flights/info?flight=' + flight)
            .success(function(data) {
                //$scope.text = "Delete student with id = " + d + " successful";
                if (data['status'] == 0) {

                    loadFlightInfo($scope, $http);
                    alert('Xóa thành công');
                } else alert("Có lỗi xảy ra khi xóa chuyến bay này. Chuyến bay này đã được lên lịch bay.");
            })
            .error(function(data, status) {
                //$scope.text = "Error: " + data;
                var test = "";
            });
    };
}]);

app.controller('FlightScheduleCtrl', ['$scope', '$http', function($scope, $http) {

    loadFlights($scope, $http);
    adminMode = 1;

    $scope.deleteFlight = function(flight, date) {
        var sendData = {};
        sendData.flight = flight;
        sendData.date = date;
        $http.delete('/flights?flight=' + flight + "&date=" + date)
            .success(function(data) {
                //$scope.text = "Delete student with id = " + d + " successful";
                if (data['status'] == 0) {
                    loadFlights($scope, $http);
                    alert('Xóa thành công');
                } else alert("Có lỗi xảy ra trong khi xóa chuyến bay này. Có thể do chuyến bay đã có hành khách đặt vé. Để đảm bảo quyền lợi cho hành khách, vui lòng hủy các vé đã đặt trước khi xóa chuyến bay này.");
                //loadFlights($scope, $http);
            })
            .error(function(data, status) {
                //$scope.text = "Error: " + data;
                var test = "test";
            });
    }

    $scope.fillUpdate = function(id) {

        loadFlightInfo($scope, $http);
        $scope.title = "Chỉnh sửa";
        update = 1;
        $('#flightCode').text($scope.listFlights[id].Ma);
        document.getElementById("date").value = $scope.listFlights[id].Ngay;
        document.getElementById("time").value = $scope.listFlights[id].Gio;
        document.getElementById("flightTime").value = $scope.listFlights[id].ThoiGianBay;
        $scope.sid = $scope.listFlights[id].Ma;
        $scope.sdate = $scope.listFlights[id].Ngay;
    }

    $scope.updateFlight = function(id, date) {
        var temp = {};
        temp.MaCB = id;
        temp.NgayCu = date;
        temp.MaCBMoi = $('#flightCode').text();
        temp.Ngay = document.getElementById("date").value;
        temp.Gio = document.getElementById("time").value;
        temp.ThoiGianBay = document.getElementById("flightTime").value;

        $http.put('/flights', temp)
            .success(function(data) {
                //$scope.text = "Update successful";
                //loadFlights($scope, $http);
                if (data['status'] == 0) {
                    alert('Cập nhật thành công');
                    loadFlights($scope, $http);
                    $http.put('/tickets/fkey', temp)
                        .success(function(data) {
                            var test = "";
                        })
                        .error(function(data, status) {
                            //$scope.text = "Error: " + data;
                            var test = "";
                        });
                } else alert("Có lỗi xảy ra khi cập nhật chuyến bay. Xin đảm bảo rằng trong cùng một ngày không thể có 2 chuyến bay có cùng mã chuyến bay với nhau.");
            })
            .error(function(data, status) {
                //$scope.text = "Error: " + data;
            });
    }

    $scope.fillInsert = function() {
        update = 0;
        loadFlightInfo($scope, $http);
        $scope.title = "Thêm chuyến bay";

        $('#flightCode').text("Chọn mã chuyến bay");
        document.getElementById("date").value = "";
        document.getElementById("time").value = "";
        document.getElementById("flightTime").value = "";

    }

    $scope.insertFlight = function() {
        if ($('#flightCode').text() != 'Chọn mã chuyến bay' && $('#date').val() != '') {
            var temp = {};
            temp.Ma = $('#flightCode').text();
            temp.Ngay = document.getElementById("date").value;
            temp.Gio = document.getElementById("time").value;
            temp.ThoiGianBay = document.getElementById("flightTime").value;
            $http.post('/flights', temp)
                .success(function(data) {
                    //$scope.text = "Insert successful";
                    if (data['status'] == 0) {
                        $('#myModal').modal('hide');
                        loadFlights($scope, $http);
                        alert('Thêm thành công');
                    } else alert('Có lỗi xảy ra khi thêm chuyến bay. Xin đảm bảo rằng trong cùng một ngày không thể có 2 chuyến bay có cùng mã chuyến bay với nhau.');
                })
                .error(function(data, status) {
                    //$scope.text = "Error: " + data;

                });
        } else {
            //$scope.text = "ID can not be null";
            alert("Vui lòng nhập đủ thông tin về ngày bay và mã chuyến bay");

        }
    }

    $scope.fillUpdateTicket = function(id) {
        update = 1;
        $scope.title1 = "Chỉnh sửa vé";
        document.getElementById("priceLevel").value = $scope.Tickets[id].MucGia;
        document.getElementById("number").value = $scope.Tickets[id].SoLuong;
        document.getElementById("price").value = $scope.Tickets[id].GiaBan;
        $scope.sid = $scope.Tickets[id].MaThongTin;
        $scope.ticketType = $scope.Tickets[id].LoaiVe;
        $scope.pLevel = document.getElementById("priceLevel").value;
    }

    $scope.fillInsertTicket = function() {
        update = 0;
        $scope.title1 = "Thêm vé";
        document.getElementById("type").value = "";
        document.getElementById("priceLevel").value = "";
        document.getElementById("number").value = "";
        document.getElementById("price").value = "";
    }

    $scope.updateTicket = function(id, type, pLevel, flight, date) {
        var temp = {};
        temp.Ma = id;
        temp.LoaiVeCu = type;
        temp.MucGiaCu = pLevel;
        temp.MucGia = document.getElementById("priceLevel").value;
        temp.SoLuong = document.getElementById("number").value;
        temp.GiaBan = document.getElementById("price").value;
        $http.put('/tickets', temp)
            .success(function(data) {
                //$scope.text = "Update successful";
                if (data['status'] == 0) {
                    $('#myModal2').modal('hide');
                    loadTickets($scope, $http, flight, date);
                    alert('Cập nhật thành công');
                } else alert("Có lỗi xảy ra khi cập nhật vé. Xin đảm bảo rằng không có hai vé nào cùng hạng và cùng mức giá.");
            })
            .error(function(data, status) {
                //$scope.text = "Error: " + data;
            });
    }

    $scope.insertTicket = function(flight, date) {
        if ((document.getElementById("type").value == 'Y' || document.getElementById("type").value == 'C') && document.getElementById("priceLevel").value != "") {
            var temp = {};
            temp.MaCB = flight;
            temp.Ngay = date;
            temp.Ma = flight + date;
            temp.LoaiVe = document.getElementById("type").value;
            temp.MaThongTin = temp.Ma + temp.LoaiVe;
            temp.MucGia = document.getElementById("priceLevel").value;
            temp.SoLuong = document.getElementById("number").value;
            temp.GiaBan = document.getElementById("price").value;
            $http.post('/tickets', temp)
                .success(function(data) {
                    if (data['status'] == 0) {
                        $('#myModal2').modal('hide');
                        loadTickets($scope, $http, flight, date);
                        alert('Thêm thành công');
                    } else alert("Có lỗi xảy ra khi thêm vé mới. Xin đảm bảo rằng không có hai vé nào cùng hạng và cùng mức giá.");

                })
                .error(function(data, status) {

                });
        } else {
            //$scope.text = "ID can not be null";
            alert("Lỗi xảy ra. Vui lòng đảm bảo rằng loại vé chỉ là Y hoặc C");
        }
    }

    $(function() {
        $('#id').keypress(function(e) {
            if ((e.which >= 65 && e.which <= 90) || (e.which >= 97 && e.which <= 122) || (e.which >= 48 && e.which <= 57)) {} else {
                return false;
            }
        });
    });

    $scope.chooseFlight = function(s) {
        $('#flightCode').text(s);
    }

    $scope.loadTicketTypeInfo = function(flight, date) {
        $scope.f = flight;
        $scope.d = date;
        $scope.Tickets = [];
        $http.get('/tickets?flight=' + flight + '&date=' + date)
            .success(function(data) {
                for (var i = 0; i < data.length; i++) {
                    var item = {};
                    item.MaThongTin = data[i].MaThongTin;
                    item.MaLoaiVe = data[i].MaLoaiVe;
                    item.LoaiVe = data[i].Hang;
                    item.MucGia = data[i].MucGia;
                    item.SoLuong = data[i].SoLuong;
                    item.GiaBan = data[i].GiaBan;
                    item.MaCB = flight;
                    item.Ngay = date;
                    $scope.Tickets.push(item);
                }
            })
            .error(function(data, status) {
                scope.text = "Error: " + data;
            });
    }
    $scope.deleteTicket = function(typeCode, type, priceLevel, flight, date) {
        var temp = [];
        temp.MaLoaiVe = typeCode;
        temp.Hang = type;
        temp.MucGia = priceLevel;
        temp.MaCB = flight;
        temp.Ngay = date;
        $http.delete('/tickets?MaLoaiVe=' + typeCode + '&Hang=' + type + '&MucGia=' + priceLevel + '&MaCB=' + flight + '&Ngay=' + date)
            .success(function(data) {
                if (data['status'] == 0)
                    loadTickets($scope, $http, flight, date);
            });
    }
}]);
