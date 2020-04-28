var msgs = {
  warn1: function(values) {
    return 'The attribute [ ' + values.attr.name + ' ] must have a value.';
  }
};

export default {
  id: 'attr-value-not-empty',
  description: 'All attributes must have values.',
  msgs: msgs,
  init: function(parser, reporter) {
    var self = this;
    parser.addListener('tagstart', function(event) {
      var attrs = event.attrs,
        attr,
        col = event.col + event.tagName.length + 1;
      for (var i = 0, l = attrs.length; i < l; i++) {
        attr = attrs[i];
        if (attr.quote === '' && attr.value === '') {
          reporter.warn(
            msgs.warn1({attr: attr}),
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
