var msgs = {
  error1: function(values) {
    return (
      'The value of attribute [ ' +
      values.attr.name +
      ' ] must be in double quotes.'
    );
  }
};

export default {
  id: 'attr-value-double-quotes',
  description: 'Attribute values must be in double quotes.',
  msgs: msgs,
  init: function(parser, reporter) {
    var self = this;
    parser.addListener('tagstart', function(event) {
      var attrs = event.attrs,
        attr,
        col = event.col + event.tagName.length + 1;
      for (var i = 0, l = attrs.length; i < l; i++) {
        attr = attrs[i];
        if (
          (attr.value !== '' && attr.quote !== '"') ||
          (attr.value === '' && attr.quote === "'")
        ) {
          reporter.error(
            msgs.error1({attr: attr}),
            event.line,
            col + attr.index,
            self,
            attr.raw
          );
        }
      }
    });
  }
};
