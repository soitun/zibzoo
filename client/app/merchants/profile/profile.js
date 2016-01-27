angular.module('zibzoo.merchant', [])
  .controller('MerchantProfileController', ['$scope', 'vendor', '$stateParams', 'User', function ($scope, vendor, $stateParams, User) {

    User.getFromLocal();

    $scope.img = 'http://rlv.zcache.com/i_love_food_trucks_square_sticker-r21025c827b5f4cb9823264e110552eeb_v9wf3_8byvr_324.jpg';
    $scope.cuisines = ['American', 'Burger', 'Fusion', 'Asian', 'Spicy'];
    $scope.vendor = User.data;

    $scope.merchantId = $stateParams.merchantId;

    $scope.updateVendor = function (updatedVendor) {
      User.setNewToLocal();
      vendor.updateVendor(updatedVendor)
        .then(function (data) {
          $scope.updateStatus = data.status;
          console.log('vendor updated successfully', data);
        })
        .catch(function (error) {
          $scope.updateStatus = error.status;
        });
    };
  }]);
