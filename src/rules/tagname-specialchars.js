var msgs = {
  error1: function(values) {
    return (
      'The html element name of [ ' +
      values.tagName +
      ' ] contains special character.'
    );
  }
};

export default {
  id: 'tagname-specialchars',
  description: 'All html element names must be in lowercase.',
  msgs: msgs,
  init: function(parser, reporter) {
    var self = this;
    var specialchars = /[^a-zA-Z0-9\-:_]/;
    parser.addListener('tagstart,tagend', function(event) {
      var tagName = event.tagName;
      if (specialchars.test(tagName)) {
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
