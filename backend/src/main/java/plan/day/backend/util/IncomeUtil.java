package plan.day.backend.util;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import plan.day.backend.model.Income;

import java.util.List;

public class IncomeUtil {
    public JSONArray IncomeParser(List<Income> income){
        JSONArray res = new JSONArray();
        for(int i = 0; i<income.size(); i++){
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("id",income.get(i).getId());
            jsonObject.put("createDate",income.get(i).getCreateDate());
            jsonObject.put("source",income.get(i).getSource());
            jsonObject.put("totalAmount",income.get(i).getTotalAmount());
            res.add(jsonObject);
        }
        return res;
    }

}
