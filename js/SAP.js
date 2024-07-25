var app = angular.module("myapp", ["ngRoute"]);
app.config(function ($routeProvider) {
    $routeProvider
        .when("/home", {
            templateUrl: "main.html"
        })
        .when("/danhsachsanpham", {
            templateUrl: "danhsachsanpham.html",
            controller: "myctrlsanpham",
            filter: "nameFilter"
        })
        .when("/all", {
            templateUrl: "vechungtoi.html"
        })
        .when("/nguongoc", {
            templateUrl: "nguongoc.html"
        })
        .when("/muangay", {
            templateUrl: "muangay.html"
        })
        .when("/dangnhap", {
            templateUrl: "dangnhap.html",
            controller: "myctrldangnhap"
        })
        .when("/dangki", {
            templateUrl: "dangki.html",
            controller: "myctrldangki"
        })
        .when("/quenmatkhau", {
            templateUrl: "quenmatkhau.html",
            controller: "myctrlquenmatkhau"
        })
        .when("/giohang", {
            templateUrl: "giohang.html",
            controller: "myctrlsanpham"
        })
        .when("/chitietsanpham/:masp", {
            templateUrl: "chitietsanpham.html",
            controller: "myctrlchitiet"
        })
        .otherwise({
            redirectTo: "/home"
        })
})
app.run(function ($rootScope) {
    $rootScope.$on('$routeChangeStart', function () {
        $rootScope.loading = true;
    });
    $rootScope.$on('$routeChangeSuccess', function () {
        $rootScope.loading = false;
    });
    $rootScope.$on('$routeChangeError', function () {
        $rootScope.loading = false;
        alert("lỗi không tìm được template");
    });
})
/*
app.controller('appCtrl', function($scope, $rootScope, $http){
    $rootScope.loading = true;
    $rootScope.showMenu = true;
    $scope.sodienthoai = '0123456789';
    $scope.dsSP = [];
    $scope.cart = [];
    //$scope.keyword = 'text default';
    $scope.addToCart = function(sp){
      console.log(sp);
      //Chưa có sp->thêm vào với sl=1
      if($scope.cart.find(item => item.id == sp.id)==undefined){
        sp.soluong = 1;
        $scope.cart.push(sp);
      }
      else{//Đã có sp->sl=sl+1
        $scope.cart.find(item => item.id == sp.id).soluong++;
      }
      console.log($scope.cart);
    }
    
  });
  */
app.controller("myctrl", function ($scope, $rootScope, $http) {
    $scope.products = [];
    $scope.cart = [];
    $http.get("js/Prod.js").then(function (response) {
        $scope.products = response.data;
        console.log($scope.products);
        $scope.begin = 0;
        $scope.pageCount = Math.ceil($scope.products.length / 8);
        $scope.first = function () {
            $scope.begin = 0;
        };
        $scope.prev = function () {
            if ($scope.begin > 0) {
                $scope.begin -= 8;
            }
        };
        $scope.next = function () {
            if ($scope.begin < ($scope.pageCount - 1) * 8) {
                $scope.begin += 8;

            }
        };
        $scope.last = function () {
            $scope.begin = ($scope.pageCount - 1) * 8;
        };
    });
    $scope.user = [
        {
            "ho": "Nguyen",
            "ten": "Phong",
            "sdt": "0902308618",
            "email": "phongnpps28519@fpt.edu.vn",
            "matkhau": "123456"
        },
        {
            "ho": "hoai",
            "ten": "Phong",
            "sdt": "0927685748",
            "email": "hoaiphong@gmail.com",
            "matkhau": "123456"
        }
    ];
    // $http.get("js/user.js").then(function (reponse) {
    //     $scope.user = reponse.data;
    //     console.log($scope.user);
    // })
});
app.controller("myctrlsanpham", function ($scope, $http, $location) {
    // $scope.products = [];
    // $http.get("js/Prod.js").then(function (response) {
    //     $scope.products = response.data;
    //     console.log($scope.products);
    //     $scope.begin = 0;
    //     $scope.pageCount = Math.ceil($scope.products.length / 8);
    //     $scope.first = function () {
    //         $scope.begin = 0;
    //     };
    //     $scope.prev = function () {
    //         if ($scope.begin > 0) {
    //             $scope.begin -= 8;
    //         }
    //     };
    //     $scope.next = function () {
    //         if ($scope.begin < ($scope.pageCount - 1) * 8) {
    //             $scope.begin += 8;

    //         }
    //     };
    //     $scope.last = function () {
    //         $scope.begin = ($scope.pageCount - 1) * 8;
    //     };
    // });

    // $scope.cart = [];
    // $http.get("js/listgiohang.js").then(function (response) {
    //     $scope.cart = response.data;
    //     console.log($scope.cart);
    // });
    $scope.updateTotal = function () {
        $scope.totalAmount = 0;
        angular.forEach($scope.cart, function (cart) {
            $scope.totalAmount += cart.price * cart.quantity;
        });
    };

    $scope.getTotalAmount = function () {
        $scope.updateTotal();
        return $scope.totalAmount + ' VNĐ';
    };
    $scope.delete = function (cartId) {
        var index = $scope.cart.findIndex(function (cart) {
            return cart.id === cartId;
        });

        if (index !== -1) {
            $scope.cart.splice(index, 1);
            $scope.updateTotal();
            console.log($scope.cart);
        }
    };

    $scope.addToCart = function (p) {
        console.log(p);
        //Chưa có sp->thêm vào với sl=1
        if ($scope.cart.find(item => item.id == p.id) == undefined) {
            p.quantity = 1;
            $scope.cart.push(p);
        }
        else {//Đã có sp->sl=sl+1
            $scope.cart.find(item => item.id == p.id).quantity++;
        }
        console.log($scope.cart);
    }


    $scope.sortBy = function (prop) {
        $scope.prop = prop;
    };
});
app.controller('myctrlchitiet', function ($scope, $routeParams) {
    $scope.id = $routeParams.masp;
    $scope.sp = {};
    for (const item of $scope.products) {
        if (item.id == $scope.id) {
            $scope.sp = item;
            break;
        }
    }
    console.log($scope.sp);
});

app.controller("myctrldangnhap", function ($scope, $http) {
    // $scope.user = [];
    // $http.get("js/user.js").then(function (reponse) {
    //     $scope.user = reponse.data;
    //     console.log($scope.user);
    // })
    $scope.login = function () {
        var checkEmail = $scope.try.email;
        var checkPassword = $scope.try.password;
        var count = 0;
        console.log($scope.user.length);
        console.log($scope.user[0].email);
        console.log($scope.user[0].matkhau);
        console.log(checkEmail);
        console.log(checkPassword);
        for (i = 0; i < $scope.user.length; i++) {
            if ($scope.user[i].email == checkEmail && $scope.user[i].matkhau == checkPassword) {
                count++;
            }
        }
        if (count != 0) {
            alert("Đang nhập thành công");
        } else {
            alert("Đang nhập thất bại");
        }
    }
});
app.controller("myctrldangki", function ($scope) {
    $scope.reg = function () {
        var ho = $scope.dangki.ho;
        var ten = $scope.dangki.ten;
        var email = $scope.dangki.email;
        var sdt = $scope.dangki.sdt;
        var matkhau = $scope.dangki.matkhau;
        for (var i = 0; i < $scope.user.length; i++) {
            if (email == $scope.user[i].email) {
                alert("Email này đã có người đăng kí");
                break;
            } else if (sdt == $scope.user[i].sdt) {
                alert("Số điện thoại này đã được đăng kí")
                break;
            } else {
                alert("Đăng kí thành công");
                $scope.user.push($scope.dangki);
                console.log($scope.user);
                break;
            }
        }
    }
});
// app.controller("myctrlgiohang", function ($scope, $http) {
//     $scope.products = [];
//     $http.get("js/listgiohang.js").then(function (response) {
//         $scope.products = response.data;

//     });
//     $scope.updateTotal = function () {
//         $scope.totalAmount = 0;
//         angular.forEach($scope.products, function (product) {
//             $scope.totalAmount += product.price * product.quantity;
//         });
//     };

//     $scope.getTotalAmount = function () {
//         $scope.updateTotal();
//         return $scope.totalAmount + ' VNĐ';
//     };
//     $scope.delete = function (productId) {
//         var index = $scope.products.findIndex(function (product) {
//             return product.id === productId;
//         });

//         if (index !== -1) {
//             $scope.products.splice(index, 1);
//             $scope.updateTotal();
//         }
//     };
// });
app.controller("myctrlquenmatkhau", function ($scope) {

});
angular.module("myapp").filter("nameFilter", function () {
    return function (items, searchText) {
        if (!searchText) {
            return items;
        }

        searchText = searchText.toLowerCase();
        return items.filter(function (item) {
            return item.name.toLowerCase().includes(searchText);
        });
    };
});
