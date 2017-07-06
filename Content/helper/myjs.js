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

  $(document).ready(function() {


    $('#rangeLink').click(function() {
      $('#rangeSearch').toggle('slow');
    });

    var table = $('#example').DataTable({
      "order": [[1, 'dsc']],
      "lengthMenu": [[10, 25, 50, -1],[10, 25, 50, "All"]],
      "select": true,
      "dom": 'Blfrtip',
      "buttons": [
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
      "ajax": "./helper/sample/target.txt",


      initComplete: function() {
        this.api().columns([6, 7, 8, 9, 10]).every(function() {
          var column = this;

          var selectFooter = $('<select><option value=""></option></select>')
            .appendTo($(column.footer()).empty())
            .on('change', function() {
              var val = $.fn.dataTable.util.escapeRegex(
                $(this).val()
              );

              column
                .search(val ? '^' + val + '$' : '', true, false)
                .draw();
            });

          column.data().unique().sort().each(function(d, j) {
            selectFooter.append('<option value="' + d + '">' + d + '</option>');
          });

        });


      }
    });

var counter = 0;	
    // generating header search boxes
    $('#example .filter th').each(function() {
      var title = $(this).text();
      if (counter < 6) {
      $(this).html('<input type="text" placeholder="Search ' + title + '" />');
    	}	
      counter = counter + 1;
    });

    table.columns().every(function() {
      var that = this;

      $('input', this.footer() ).on('keyup change', function() {
        if( that.search() !== this.value) {
          that.search(this.value)
              .draw();
        }
      });
    });

    $('#example tbody').on('click', 'tr', function() {
      $(this).toggleClass('selected');
    });

    $('button').click(function(){
      alert(table.rows('.selected').data().length+'row(s) selected');
    });

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
        });
  });
