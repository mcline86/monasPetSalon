function hook(element){
  $(element).on('change', function() {

    console.log('Start Upload \n');
    var files = $(this).get(0).files;
    if(files.length > 0){
      var formData = new FormData();
      for(var i = 0; i < files.length; i++){
        var file = files[i];
        formData.append('uploads[]', file, file.name);
      }
      $.ajax({
        url: '/admin/upload',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function(data) {
          console.log('upload : ' + data);
          $('#upload-bar').hide();
          location.reload();
        },
        xhr: function() {
          var xhr = new XMLHttpRequest();
          xhr.upload.addEventListener('progress', function(evt) {
            if(evt.lengthComputable) {
              var percentComplete = evt.loaded / evt.total;
              percentComplete = parseInt(percentComplete * 100);
              $('.progress-bar').text(percentComplete + '%');
              $('.progress-bar').width(percentComplete + '%');
              if(percentComplete === 100) {
                $('.progress-bar').html('Done');
              }
            }
          }, false);
          return xhr;
        }
      });
    }
  });
}
