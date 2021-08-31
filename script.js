$(function(){
    let searchForm = $("#searchForm");
    let searchResults = $(".results");
    let alertBox = $(".alert");

    // for checking connectivity status
    let connStatus = navigator.onLine;
    let searchIcon = $(".fa-search");
    let searchButton = $("[type = 'submit']");

    if(!connStatus){
        alertBox.addClass("show");
        alertBox.text("No Internet Connection");
        searchIcon.html("Search");
        searchButton.addClass("resizeBox");
        searchButton.attr("disabled", "disabled");
    }else{
        alertBox.removeClass("show");
        searchIcon.html("");
        alertBox.text("");
        searchButton.removeClass("resizeBox");
        searchButton.removeAttr("disabled");
    }

    searchForm.on("submit", function(e){
        e.preventDefault();
        let inputEL = $("#searchEl");
        if(inputEL.val() == ""){
            alert("Please, input your query");
        }else{
            if(searchResults.html() !== ""){
                searchResults.html("");
            }
            $.ajax({
                type: $(this).attr("method"),
                url: "https://en.wikipedia.org/w/api.php",
                data: {
                    action: 'query',
                    list: 'search',
                    format: 'json',
                    srlimit: 20,
                    srsearch: inputEL.val(),
                    origin: '*',
               },
                timeout: 2000,
                beforeSend: function(){
                    $(".img-overlay").addClass("show");
                  },
                success: function(response){
                    $(".img-overlay").css("display", "none");
                    let searchResults = response.query.search;
                    let searchNumber = searchResults.length;

                    if(searchResults == ""){
                        alert("No results found, try different keywords");
                    }else{
                    for(let i = 0; i <= searchNumber - 1; i++){
                        $(".results").append(`
                        <div class="result">
                        <h1 class="title"><a class="mainLink" href="https://en.wikipedia.org/?curid=${searchResults[i].pageid}">${searchResults[i].title}</a></h1>
                        <span class="address">https://en.wikipedia.org/?curid=${searchResults[i].pageid}</span>
                        <p class="snippet">${searchResults[i].snippet}......</p>
                        <footer class="timestamp">${searchResults[i].timestamp}</footer>
                    </div>`
                    );
                    }
                }
                }
            });
        }
    });
});