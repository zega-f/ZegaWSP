$('#cari').click(function(){
	$('#FoundResult').html('');
	var keyword = $('#keyword').val();
	$.ajax({
        type : 'get',
        url : 'http://www.omdbapi.com',
        data: {
        	'apikey':'46f22531',
        	's': keyword,
        },
        success:function(hasil)
        {
        	if (hasil.Response=="True") {
        		var res = hasil.Search;
        		console.log(hasil);
        		$.each(res, function(i, data){
        			$('#FoundResult').append(`
    					<div class="col-xl-3 col-lg-3 col-md-6">
    						<div class="card" style="margin:10px auto; width: 100%;">
							  <img class="card-img-top" src="`+data.Poster+`" alt="Card image cap">
							  <div class="card-body">
							    <h5 class="card-title">`+data.Year+`</h5>
							    <p class="card-text">`+data.Title+`</p>
							    <a data-id="`+data.imdbID+`" href="#`+data.imdbID+`" class="btn btn-success detail">Detail</a>
							  </div>
							</div
    					</div>
        				`);
        		})
        		$('.detail').click(function(){
        			var movieId = $(this).data('id');
        			$.ajax({
		              type : 'get',
		              url : 'http://www.omdbapi.com',
		              data: {
		              	'apikey':'46f22531',
		              	'i': movieId,
		              },
		              success:function(movieDetail)
		              {
		              	$('#back').css('display','block');
		              	$('#FoundResult').slideUp('fast');
		              	// $('#FoundResultDetail').css('display','inline-block');
		              	$('#FoundResultDetail').append(`
		              		
		              		<div class="col-xl-4 col-lg-4">
		              		<img src="`+movieDetail.Poster+`" alt="Card image cap" style="width:100%;">
		              		</div>
		              		<div class="col-xl-8 col-lg-8">
		              			<div class="container shadow-sm" style="padding:20px; border-radius:5px;">
		              			<h5><strong>`+movieDetail.Title+`</strong></h5>
		              			<div id="rating"></div>
		              			<hr>
		              			imdbID : `+movieDetail.imdbID+` <br>
		              			Tahun : `+movieDetail.Year+`<br>
	              				Rating : `+movieDetail.Rated+`<br>
	              				Tanggal Rilis : `+movieDetail.Released+`<br>
	              				Waktu : `+movieDetail.Runtime+`<br>
	              				Genre : `+movieDetail.Genre+`<br>
	              				Director : `+movieDetail.Director+`<br>
	              				Writer : `+movieDetail.Writer+`<br>
	              				Actors : `+movieDetail.Actors+`<br>
	              				Plot : `+movieDetail.Plot+`<br>
	              				Bahasa : `+movieDetail.Language+`<br>
	              				</div>
		              		</div>
		              		`);

		              	$.each(movieDetail.Ratings, function(r, rating){
		              				$('#rating').append(`<p>`+rating.Source+` : <b>`+rating.Value+`</b></p>`);
		              			})
		              	console.log(movieDetail);
		              }
		            });
        		})
        		$('#keyword').val('');
        		
        	}else{
        		console.log(data);
        		$('#notFoundResult').html('<div class="alert alert-warning">Film tidak ditemukan untuk kata kunci '+keyword+' :(</div>');
        	}	
        	
        }
    });
});
