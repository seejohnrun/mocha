var Suite = require('../suite')
  , Test = require('../test');

/**
 * Contextual BDD interface:
 *
 *   context('Collection', function () {
 *     var collection;
 *     set(function () {
 *       collection = new Collection;
 *     });
 *
 *     context('with one element', function () {
 *       check('should have count = 1', function () {
 *         collection.count.should.be(1);
 *       });
 *     });
 *
 *     context('when empty', function () {
 *       check('should have count = 0', function () {
 *         collection.count.should.be(0);
 *       });
 *     }
 *   });
 *
 */

module.exports = function (suite) {

  suite.on('pre-require', function (context) {

    var suites = [suite];
    var setFuncs = [];

    /**
     * Contexts re-run every set before starting
     */

    context.context = function (title, func) {

      // Create a new suite
      var newSuite = Suite.create(suites[0], title);

      // Tell the new suite what its setFuncs are at the
      // point of creation by copying them forward
      newSuite.setFuncs = [];
      for (var i = 0; i < setFuncs.length; i++) {
        newSuite.setFuncs.push(setFuncs[i]);
      }

      // New suite should get a before all which includes
      // the prior setFuncs in the proper order
      newSuite.beforeAll(function () {
        for (var i = 0; i < newSuite.setFuncs.length; i++) {
          newSuite.setFuncs[i]();
        }
      });

      // Execute the test
      suites.unshift(newSuite);
      func();
      suites.shift();

    };

    /**
     * A test
     */

    context.check = function (title, func) {
      suites[0].addTest(new Test(title, func));
    };

    /**
     * Some pre-condition
     */

    context.set = function (func) {
      setFuncs.push(func);
      suites[0].beforeAll(func);
    };

  });

};
