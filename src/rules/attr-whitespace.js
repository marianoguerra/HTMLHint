var msgs = {
  error1: function(values) {
    return (
      'The attributes of [ ' +
      values.attrName +
      ' ] must not have trailing whitespace.'
    );
  },
  error2: function(values) {
    return (
      'The attributes of [ ' +
      values.attrName +
      ' ] must be separated by only one space.'
    );
  }
};

export default {
  id: 'attr-whitespace',
  description:
    'All attributes should be separated by only one space and not have leading/trailing whitespace.',
  msgs: msgs,
  init: function(parser, reporter, options) {
    var self = this;
    var exceptions = Array.isArray(options) ? options : [];

    parser.addListener('tagstart', function(event) {
      var attrs = event.attrs,
        attr,
        col = event.col + event.tagName.length + 1;
      attrs.forEach(function(elem) {
        attr = elem;
        var attrName = elem.name;

        if (exceptions.indexOf(attrName) !== -1) {
          return;
        }

        //Check first and last characters for spaces
        if (elem.value.trim(elem.value) !== elem.value) {
          reporter.error(
            msgs.error1({attrName: attrName}),
            event.line,
            col + attr.index,
            self,
            attr.raw
          );
        }
        if (elem.value.replace(/ +(?= )/g, '') !== elem.value) {
          reporter.error(
            msgs.error2({attrName: attrName}),
            event.line,
            col + attr.index,
            self,
            attr.raw
          );
        }
      });
    });
  }
};
