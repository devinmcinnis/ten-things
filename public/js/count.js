/*
 *
 * Example file
 *
 */

(function() {
  'use strict';

  var $document = $(document);

  function buildNewLine(id) {
    return  '<li data-id="' + id + '">' +
              '<label>' +
                '<span class="c-thing__label">#' + id + '</span>' +
                '<input name="thing' + id + '" class="c-thing__input" type="text" '+
                  'placeholder="The next thing is next">' +
              '</label>' +
            '</li>';
  }

  function buildListOfThings(thing) {
    return  '<li>' +
              '<p>' + thing + '</p>' +
            '</li>';
  }

  $document.ready(function() {
    var oldDate = localStorage.getItem('submit');

    $document.on('submit', 'form#tenthings', function(e) {
      e.preventDefault();
      var $form = $(this),
        data = $form.serializeArray();

      $.post('/things', data, function(res) {
        console.log(res);

        $form.remove();

        var submitText = '<p>Tomorrow will bring new things. Here were some other ideas:</p>';
        
        var listOfThings = '<ul>';

        for (var i = 0; i < res.things.length; i += 1) {
          listOfThings += buildListOfThings(res.things[i]);
        }

        listOfThings += '</ul>';

        $('main').append(submitText);
        $('main').append(listOfThings);

        localStorage.setItem('submit', Date.now());
      });
    });

    $document.on('keypress', '.c-thing__input', function(e) {
      var $input = $(this),
        $list = $('ul'),
        $parent = $input.closest('li'),
        id = parseInt($parent.data('id'), 10) + 1;

      // 13 is [enter]
      if (e.keyCode === 13) {
        // Prevent form from submitting
        e.preventDefault();

        $('input[name=thing' + id +']').focus();
      }

      if ($input.val() && !$parent.hasClass('active')) {
        var $newListItem = $(buildNewLine(id));
        $list.append($newListItem);
        window.ga('send','event','itemCreation','addedItem',null,id);
        $parent.addClass('active');
        if (id > 9) {
          $('.c-thing__submit').css('display', 'block');
        }
      }
    });
  });
})();
