package plan.day.backend.controller;

import io.swagger.annotations.Api;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import plan.day.backend.payload.request.ImageRecognizeRequest;
import plan.day.backend.payload.response.GeneralApiResponse;
import plan.day.backend.util.HttpUtil;

import javax.validation.Valid;

@Api("Img Recognise")
@RestController
@RequestMapping("/api/img")
public class ImgController {

    @PostMapping("/recImg")
    public ResponseEntity<?> createIncome(
            @Valid @RequestBody ImageRecognizeRequest request) {
        String imgRecognizeResult = doPost(request.getUrl());
        return ResponseEntity.ok(new GeneralApiResponse(true, imgRecognizeResult));
    }

    public static String doPost(String url) {
        String apiKey = "6b067d014a88957";
        String api = "https://api.ocr.space/parse/image/";
        try{
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
            headers.add("apikey", apiKey);

            MultiValueMap<String , String> params = new LinkedMultiValueMap<String,String>();
            params.add("base64Image", url);

            String result = HttpUtil.postRequestByUrlencoded(api, params, headers);
            return result;

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }



}
