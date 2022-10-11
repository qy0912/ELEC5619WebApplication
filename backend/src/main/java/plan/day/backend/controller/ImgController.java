package plan.day.backend.controller;



import com.alibaba.fastjson.JSONObject;
import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.httpclient.Header;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.params.HttpMethodParams;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.springframework.http.HttpEntity;


import io.swagger.annotations.Api;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import plan.day.backend.annotation.CurrentUser;
import plan.day.backend.model.CustomUserDetails;
import plan.day.backend.model.Income;
import plan.day.backend.payload.request.AddIncomeRequest;
import plan.day.backend.payload.request.ImageRecognizeRequest;
import plan.day.backend.payload.response.GeneralApiResponse;

import javax.validation.Valid;
import java.io.Closeable;
import java.util.HashMap;
import java.util.Map;

@Api("Img Recognise")
@RestController
@RequestMapping("/api/img")
public class ImgController {


    /*@PostMapping("/recImg")
    public ResponseEntity<?> recogniseImg(

    }*/

    @PostMapping("/add")
    public ResponseEntity<?> createIncome(
            @Valid @RequestBody ImageRecognizeRequest request) {
        String imgRecognizeResult = doPost(request.getUrl());
        return ResponseEntity.ok(new GeneralApiResponse(true, imgRecognizeResult));
    }

    public static String doPost(String url) {
        String apiKey = "6b067d014a88957";
        String api = "https://api.ocr.space/parse/image/";

        try{
            CloseableHttpClient httpClient = HttpClientBuilder.create().build();
            HttpPost httpPost = new HttpPost(api);
            //set header
            httpPost.addHeader("apikey", apiKey);
            //set body
            Map<String, String> paramMap = new HashMap<String, String>();
            paramMap.put("url", url);
            httpPost.setEntity(new StringEntity(JSONObject.toJSONString(paramMap), ContentType.create("application/json", "utf-8")));
            //make post
            CloseableHttpResponse response = null;
            response = httpClient.execute(httpPost);
            HttpEntity responseEntity = (HttpEntity) response.getEntity();
            String result = EntityUtils.toString((org.apache.http.HttpEntity) responseEntity);
            return result;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }


    }



}
