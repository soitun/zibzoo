angular.module('zibzoo.merchant.menu', [])
  .controller('MerchantMenuController', ['$scope', 'menu', 'vendor', '$stateParams', function ($scope, menu, vendor, $stateParams) {

    $scope.menu = menu;

    $scope.menuItem = {
      name: '',
      description: '',
      price: '',
      inStock: '',
      isGlutenFree: false,
      isVegan: false,
      isDairyFree: false,
      isVegetarian: false
    };

    $scope.clearItem = function () {
      for (var key in $scope.menuItem) {
        if (key) {
          $scope.menuItem = '';
        }
      }
    };

    $scope.deleteMenuItem = function (menuItemIndex) {
      var toDelete = $scope.menu.remove(menuItemIndex);
      $scope.menu.deleteMenuItem({ vendorId: toDelete })
        .then(function (data) {
          console.log(data);
        })
        .catch(function (error) {
          $scope.status = error.status;
        });
    };

    $scope.saveMenuItem = function (menuItem) {
      angular.extend(menuItem, { vendorId: $stateParams.merchantId });
      $scope.menu.addItem(menuItem);
      $scope.clearItem();
      $scope.menu.saveMenuItem(menuItem)
        .then(function (data) {
          console.log(data);
        })
        .catch(function (error) {
          $scope.status = error.status;
        });
    };

    $scope.getMenu = function (merchandId) {
      $scope.menu.items = [];
      vendor.getVendor($stateParams.merchantId)
        .then(function (data) {
          if (data.data) {
            $scope.menu.items = data.data.menuItems;
          }
        })
        .catch(function (error) {
          $scope.status = error.status;
        });
    };
    $scope.getMenu();
  }]);
