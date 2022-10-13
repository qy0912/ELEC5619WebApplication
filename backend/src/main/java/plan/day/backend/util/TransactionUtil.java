package plan.day.backend.util;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import plan.day.backend.model.Income;
import plan.day.backend.model.Transaction;

import java.util.List;

public class TransactionUtil {
    public JSONArray TransactionParser(List<Transaction> transactions){
        JSONArray res = new JSONArray();
        for(int i = 0; i<transactions.size(); i++){
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("id",transactions.get(i).getId());
            jsonObject.put("createDate",transactions.get(i).getCreateDate());
            jsonObject.put("description",transactions.get(i).getDescription());
            jsonObject.put("totalAmount",transactions.get(i).getTotalAmount());
            jsonObject.put("source",transactions.get(i).getSource());
            jsonObject.put("category",transactions.get(i).getCategory().getCategory_name());
            res.add(jsonObject);
        }
        return res;
    }

}
