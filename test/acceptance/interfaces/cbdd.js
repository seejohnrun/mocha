
function ok(expr, msg) {
  if (!expr) throw new Error(msg);
}

context('Array', function () {

  var arr;
  set(function () {
    arr = new Array();
  });

  check('should have 0 elements', function () {
    ok(arr.length === 0);
  });

  context('wcheckh one element', function () {

    set(function () {
      arr.push(1);
    });

    check('should have 1 element', function () {
      ok(arr.length === 1);
    });

    context('that has been removed', function () {

      set(function () {
        arr.shift();
      });

      check('should have 0 elements', function () {
        ok(arr.length === 0);
      });

    });

  });

});
