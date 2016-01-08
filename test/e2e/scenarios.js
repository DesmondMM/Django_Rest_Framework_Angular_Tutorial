'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('PollCat App', function() {

  describe('Question list view', function() {

    beforeEach(function() {
      browser.get('app/index.html');
    });


    it('should filter the question list as a user types into the search box', function() {

      var qnList = element.all(by.repeater('question in questions'));
      var query = element(by.model('query'));

      expect(qnList.count()).toBe(4);

      query.sendKeys('1');
      expect(qnList.count()).toBe(1);

      query.clear();
      query.sendKeys('2');
      expect(qnList.count()).toBe(1);


    });query.clear();
      query.sendKeys('3');
      expect(qnList.count()).toBe(1);

  });
});
