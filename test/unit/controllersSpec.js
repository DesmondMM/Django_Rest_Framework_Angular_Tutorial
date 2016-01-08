describe('PollCat controllers', function() {

  describe('PollListCtrl', function(){
    var scope, ctrl;

    beforeEach(module('pollcatApp'));

    beforeEach(inject(function($controller) {
      scope = {};
      ctrl = $controller('PollListCtrl', {$scope:scope});
    }));

    it('should create "questions" model with 3 questions', function() {
      expect(scope.questions.length).toBe(3);
    });


    it('should set the default value of orderProp model', function() {
      expect(scope.orderProp).toBe('id');
    });
  });
});