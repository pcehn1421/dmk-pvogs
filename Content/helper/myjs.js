  //rangeSearch:
  $.fn.dataTable.ext.search.push(
    function(settings, data, dataIndex) {
      var min = parseInt($('#min').val(), 10);
      var max = parseInt($('#max').val(), 10);
      var nopVOG = parseFloat(data[4]) || 0; // use data for the age column

      if ((isNaN(min) && isNaN(max)) ||
        (isNaN(min) && nopVOG <= max) ||
        (min <= nopVOG && isNaN(max)) ||
        (min <= nopVOG && nopVOG <= max)) {
        return true;
      }
      return false;
    }
  );

  $('#min, #max').keyup(function() {
    table.draw();
  });



  function filterColumn(i) {
    $('#example').DataTable().column(i).search(
      $('input', $('.filter th')[i]).val(),
      $('#input').prop('checked', true),
    ).draw();
  }

  $(document).ready(function() {

    $('#rangeLink').click(function() {
      $('#rangeSearch').toggle('slow');
    });

    var table = $('#example').DataTable({
      lengthMenu: [[10,25,50,-1],[10,25,50,"All"]],
      select: true,
      dom: 'Blfrtip',
      buttons: [
        'colvis',
        {
          extend: 'collection',
          text: 'Export options',
          buttons: [
            {
              extend: 'pdf',
              text: 'pdf all'
            },
            {
              extend: 'pdf',
              text: 'pdf selected',
              exportOptions: {
                modifier: {
                  selected: true
                }
              }
            },
            {
              extend: 'copy',
              text: 'copy all'
            },
            {
              extend: 'copy',
              text: 'copy selected',
              exportOptions: {
                modifier: {
                  selected: true
                }
              }
            },
            {
              extend: 'print',
              text: 'print all'
            },
            {
              extend: 'print',
              text: 'print selected',
              exportOptions: {
                modifier: {
                  selected: true
                }
              }
            },
            {
              extend: 'csv',
              text: 'csv all'
            },
            {
              extend: 'csv',
              text: 'csv selected',
              exportOptions: {
                modifier: {
                  selected: true
                }
              }
            },
            {
              extend: 'excel',
              text: 'excel all'
            },
            {
              extend: 'excel',
              text: 'excel selected',
              exportOptions: {
                modifier: {
                  selected: true
                }
              }
            }

          ]
        }
      ],

      ajax: './helper/sample/JSONSample.txt',

      initComplete: function() {
        this.api().columns([6, 7, 8, 9, 10]).every(function() {
          var column = this;

          var selectHeader = $('<select><option value=""></option></select>')
            .appendTo($(column.header()).empty())
            .on('change', function() {
              var val = $.fn.dataTable.util.escapeRegex(
                $(this).val()
              );

              column
                .search(val ? '^' + val + '$' : '', true, false)
                .draw();
            });

          column.data().unique().sort().each(function(d, j) {
            selectHeader.append('<option value="' + d + '">' + d + '</option>');
          });

        });

        $('#example .filter th').each(function() {

          var title = $('#example tfoot th').eq($(this).index()).text();
          $(this).html('<input type="text" placeholder="Search ' + title + '" />');

        });

        table.columns().eq(0).each(function(colIdx) {
          $('input', $('.filter th')[colIdx]).on('keyup change', function() {
            filterColumn(colIdx);
          });
        });

        $('input').on('keyup click', function() {
          filterColumn($(this).parents('tr').attr('data-columnindex'));
        });
      }
    });

    /**		Delete selected rows
        $('#example tbody').on('click', 'tr', function() {
          if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
          } else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
          }
        });

        $('button').click(function() {
          table.row('.selected').remove().draw(false);
        });**/
  });
