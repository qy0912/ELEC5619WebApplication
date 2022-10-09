package plan.day.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestBody;
import javax.validation.Valid;



import plan.day.backend.util.*;
import plan.day.backend.payload.request.*;
@RestController
@RequestMapping("/api/dolars")
public class DolarsController {

    @Value("${dolars.url}")
    String url;

    @PostMapping("/classification")
    public ResponseEntity<?> test(
        @Valid @RequestBody DolarsInteractionRequest request
    ) {
        MultiValueMap<String , String> params = new LinkedMultiValueMap<String,String>();
        params.add("words", request.getWords());
        String res = HttpUtil.postRequestByUrlencoded(url, params);
        return ResponseEntity.ok(res);
      }
}
