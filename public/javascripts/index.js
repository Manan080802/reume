var buyerEventHandler = function () {
    this.initialize = function () {
        this.from();
        this.country();
        this.state()


    };
    // when user submit the form 
    this.from = function () {
        $('#formData').on("submit", function (event) {
            event.preventDefault();
            console.log($(this)[0])

            let data = new FormData($(this)[0])
            console.log(data)

            $.ajax({
                type: "POST",
                url: "/add-emp",
                contentType: false,
                processData: false,
                data,
                success: function (result) {
                    $("#message").empty()
                    if (result.success == true) {

                        $message = `<div class="alert alert-primary" role="alert">
                        ${result.message}
                      </div>`


                        $("#message").append($message)


                        setTimeout(() => {
                            window.location.href = `${window.location.origin}/showdata`;
                        }, 5000);
                    }
                    else {
                        $message = `<div class="alert alert-danger" role="alert">
                        ${result.message}
                      </div>`


                        $("#message").append($message)

                    }
                    console.log(result)

                },
                error: function (xhr, status, error) {
                    console.log(error)
                    alert(error)
                }


            });


        })
        // get state name
        this.country = function () {
            $("#countryData").on("change", function (event) {

                let countryName = $(this).val()
                if (countryName != "Select Country") {



                    $.ajax({
                        url: "/state-name",
                        method: "post",
                        data: {
                            "country": countryName
                        },
                        error: function (xhr, status, error) {
                            console.log(error)
                        },
                        success: function (result) {
                            if (result.success == false) {
                                alert(result.message)
                            }
                            else {

                                $("#states").empty()

                                $("#states").append("<option value='Select State' selected >Select State</option>")
                                $('#states').attr('disabled', false);
                                for (let state of result.message) {
                                    $stateELement = `<option value="${state}"> ${state}</option>`
                                    $("#states").append($stateELement)

                                }
                                $('#cities').attr('disabled', true);
                                $("#cities").append("<option value='Select City' selected >Select City</option>")
                            }




                        }
                    })
                }
                else {
                    $('#states').attr('disabled', true);
                    $("#states").append("<option value='Select State' selected >Select State</option>")
                    $('#cities').attr('disabled', true);
                    $("#cities").append("<option value='Select City' selected >Select City</option>")
                }
                console.log($(this).val())
            })
        }

        // get city name

        this.state = function () {
            $("#states").on("change", function (event) {
                console.log($(this).val())
                let stateName = $(this).val()
                let countryName = $("#countryData").val()
                if (stateName != "Select State") {


                    $.ajax({
                        url: "/city-name",
                        method: "post",
                        data: {
                            "country": countryName,
                            "state": stateName
                        },
                        error: function (xhr, status, error) {
                            console.log(error)
                        },
                        success: function (result) {
                            if (result.success == false) {
                                alert(result.message)

                            }
                            // let cityName = result["data"]["cities"]
                            console.log(result)

                            $("#cities").empty()

                            $("#cities").append("<option value='Select City' selected >Select City</option>")
                            $('#cities').attr('disabled', false);
                            for (let city of result.message) {
                                $cityELement = `<option value="${city}"> ${city}</option>`
                                $("#cities").append($cityELement)

                            }
                        }
                    })
                }
                else {
                    $('#cities').empty()
                    $("#cities").append("<option value='Select City' selected >Select City</option>")
                    $('#cities').attr('disabled', true);
                }

            })
        }


    }



    var _this = this;
    this.initialize();
}
