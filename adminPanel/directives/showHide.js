angular.module('adminApp').directive('showHide', function() {
  return {
    restrict: 'E',
    scope: {
      items : '=',
      index: '='
    },
      template: '<div class="row" style="margin-top:5px;">'+
          '<div class="form-group">'+
            '<div class="col-sm-2"></div>'+
            '<div class="container col-sm-8">'+
              '<div class="panel-group">'+
                '<div class="panel panel-default">'+
                  '<div class="panel-heading">'+
                    '<h4 class="panel-title">'+
                      '<a href="javascript:void(0);" ng-click="showdes(items)">{{items.qu_short}}</a>'+
                    '</h4>'+
                  '</div>'+
                  '<div class="check-element animate-show" ng-show="hidevar">'+  
                  '<button class="btn btn-default" ng-show="hidevar" ng-click= "hidevar=false">Back</button>'+
                    '<div class="row">'+
                        '<div class="form-group">'+
                            '<div class="col-sm-2"></div>'+
                            '<h2 class="col-sm-8 control-label">{{itemdesc.qu_short}}</h2>'+
                            '<div class="col-sm-2"></div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="row">'+
                        '<div class="form-group">'+
                            '<div class="col-sm-2"></div>'+
                            '<label class="col-sm-8 control-label">{{itemdesc.qu_quest}}</label>'+
                            '<div class="col-sm-2"></div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="row">'+
                        '<div class="form-group">'+
                            '<div class="col-sm-2"></div>'+
                            '<span class="col-sm-8">{{itemdesc.qu_desc}}</span>'+
                            '<div class="col-sm-2"></div>'+
                        '</div>'+
                    '</div>'+

                  '</div>'+
                '</div>'+
              '</div>'+
            '</div>'+
            '<div class="col-sm-2"></div>'+
            '</div>'+
            '</div>',
    link: function(scope, elm, attr) {
      scope.showdes = function(item){     
          scope.itemdesc=item;
          scope.hidevar=true;
      }
    }
  };
});