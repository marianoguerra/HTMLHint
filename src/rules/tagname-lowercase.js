var msgs = {
  error1: function(values) {
    return (
      'The html element name of [ ' +
      values.tagName +
      ' ] must be in lowercase.'
    );
  }
};

export default {
  id: 'tagname-lowercase',
  description: 'All html element names must be in lowercase.',
  msgs: msgs,
  init: function(parser, reporter, options) {
    var self = this;
    var exceptions = Array.isArray(options) ? options : [];
    parser.addListener('tagstart,tagend', function(event) {
      var tagName = event.tagName;
      if (
        exceptions.indexOf(tagName) === -1 &&
        tagName !== tagName.toLowerCase()
      ) {
        reporter.error(
          msgs.error1({tagName: tagName}),
          event.line,
          event.col,
          self,
          event.raw
        );
      }
    });
  }
};
