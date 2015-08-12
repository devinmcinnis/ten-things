/*
 *
 * Example file
 *
 */

(function() {
  'use strict';

  var $document = $(document);

  function buildNewLine(id) {
    return '<li data-id="' + id + '">' +
              '<label>' +
                '<span class="c-thing__label">#' + id + '</span>' +
                '<input name="thing' + id + '" class="c-thing__input" type="text" placeholder="The next thing is next">' +
              '</label>' +
            '</li>';
  }

  $document.ready(function() {
    $document.on('submit', 'form#tenthings', function(e) {
      e.preventDefault();
      $(this).remove();
      $('main').append('Thanks for playing. Come back tomorrow!');
    });

    $document.on('keypress', 'input', function(e) {
      var $input = $(this);

      // 13 is [enter]
      if (e.keyCode === 13) {
        // Prevent form from submitting
        e.preventDefault();

        if ($input.val().length === 0) {
          return false;
        }

        var $list = $('ul'),
        id = parseInt($input.closest('li').data('id'), 10) + 1;

        var $newListItem = $(buildNewLine(id));
        $list.append($newListItem);

        setTimeout(function() {
          $('input[name="thing'+id+'"]').focus();
        }, 0);
      }
    });
  });
})();
