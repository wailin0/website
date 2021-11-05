let searchParams = new URLSearchParams(window.location.search)

Onfido.init({
    token: searchParams.get("onfidoToken"),
    onComplete: function (data) {
        // callback for when everything is complete
        window.ReactNativeWebView.postMessage("success")
    },
    onError: function (error){
        alert(error.message)
    },
    onUserExit: function (userExitCode) {
        window.ReactNativeWebView.postMessage("fail");
    },
    steps: ['welcome', 'face', 'complete'],
})



