package plan.day.backend.specification;

public class SearchCriteria {
    private String key ;
    private String operation ;
    private Object value;

    public SearchCriteria(String key,String operation,Object value){
        this.key = key;
        this.operation = operation;
        this.value = value;
    }

    public String getOperation() {
        return operation;
    }

    public String getKey() {
        return key;
    }

    public Object getValue() {
        return value;
    }
}
