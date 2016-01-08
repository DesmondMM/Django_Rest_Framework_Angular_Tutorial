'use strict';

/* jasmine specs for controllers go here */
describe('PollCat controllers', function() {

  describe('PollListCtrl', function(){

    beforeEach(module('pollcatApp'));

    it('should create "questions" model with 3 questions', inject(function($controller) {
      var scope = {},
          ctrl = $controller('PollListCtrl', {$scope:scope});

      expect(scope.phones.length).toBe(3);
    }));

  });
});
