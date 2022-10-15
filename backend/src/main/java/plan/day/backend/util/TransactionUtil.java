package plan.day.backend.util;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import plan.day.backend.model.Category;
import plan.day.backend.model.Income;
import plan.day.backend.model.Transaction;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    public JSONObject TransactionSummaryParser(List<Transaction> transactions){
;
        double sum = 0;

        Map<String, List<Transaction>> dictionary = new HashMap<String, List<Transaction>>();

        for(int i = 0; i<transactions.size(); i++){
            String cat_name = transactions.get(i).getCategory_name();
            sum += transactions.get(i).getTotalAmount();
            if(dictionary.get(cat_name)==null){
                List<Transaction> l = new ArrayList<Transaction>();
                l.add( transactions.get(i));
                dictionary.put(cat_name,l);
            }else{
                dictionary.get(cat_name).add(transactions.get(i));
            }
        }

        JSONObject res = new JSONObject();
        JSONArray categories = new JSONArray();
        res.put("Total_transaction",sum);
        for (String key : dictionary.keySet()) {
            double catSum = 0;
            JSONObject catObject = new JSONObject();

            JSONArray fullTransactions = new JSONArray();
            for(int i = 0; i<dictionary.get(key).size(); i++){
                JSONObject jsonObject = new JSONObject();
                jsonObject.put("id",dictionary.get(key).get(i).getId());
                jsonObject.put("createDate",dictionary.get(key).get(i).getCreateDate());
                jsonObject.put("description",dictionary.get(key).get(i).getDescription());
                jsonObject.put("totalAmount",dictionary.get(key).get(i).getTotalAmount());
                jsonObject.put("source",dictionary.get(key).get(i).getSource());
                jsonObject.put("category",dictionary.get(key).get(i).getCategory().getCategory_name());
                fullTransactions.add(jsonObject);
                catSum +=  dictionary.get(key).get(i).getTotalAmount();
            }
            catObject.put("catergory_name",key);
            catObject.put("transactions",fullTransactions);
            catObject.put("category_sum",catSum);
            catObject.put("category_percentage",catSum/sum*100);
            categories.add(catObject);
        }
        res.put("categories",categories);


        return res;
    }

    public JSONObject BudgePlanningParser(List<Transaction> transactions,List<Income> incomes){
        double incomesum = 0;
        for(int i = 0 ; i < incomes.size(); i++){
            incomesum+=incomes.get(i).getTotalAmount();
        }


        double transactionsum = 0;
        Map<String, Double> dictionary = new HashMap<String, Double>();
        for(int i = 0; i<transactions.size(); i++){
            String cat_name = transactions.get(i).getCategory_name();
            transactionsum += transactions.get(i).getTotalAmount();
            if(dictionary.get(cat_name)==null){
                dictionary.put(cat_name,transactions.get(i).getTotalAmount());
            }else{
                dictionary.put(cat_name,dictionary.get(cat_name)+transactions.get(i).getTotalAmount());
            }
        }

        JSONObject res = new JSONObject();
        JSONArray cat_amount = new JSONArray();
        for(String key: dictionary.keySet()){
            JSONObject catObject = new JSONObject();
            catObject.put("catergory_name",key);
            catObject.put("planed_spend",dictionary.get(key)/transactionsum*incomesum);
            cat_amount.add(catObject);
        }
        res.put("total_income",incomesum);
        res.put("catergory_plan",cat_amount);
        return res;
    }
}
