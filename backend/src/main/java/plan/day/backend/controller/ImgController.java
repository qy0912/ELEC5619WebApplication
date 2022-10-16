package plan.day.backend.controller;

import io.swagger.annotations.Api;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
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
            List<String> allMatches = new ArrayList<>();
            Pattern compile = Pattern.compile("(\\d+\\.\\d+)");
            Matcher m = compile.matcher(result);
            while (m.find()) {
              allMatches.add(m.group());
            }
            Double resultDouble = Double.MIN_VALUE;
            for (int i = 0; i < allMatches.size(); i++) {
              Double matchedValue = Double.valueOf(allMatches.get(i));
              resultDouble = Double.max(matchedValue, resultDouble);
            }
            System.out.println(resultDouble);
            String[] categoryList = {"Food", "Living", "Transportation", "Insurance", "Housing", "Others"};
            Random r = new Random();
            int categoryNum = r.nextInt(categoryList.length-1);
            return resultDouble + " " + categoryList[categoryNum];
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }



}
