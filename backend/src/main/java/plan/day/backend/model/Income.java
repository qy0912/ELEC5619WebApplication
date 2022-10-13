package plan.day.backend.model;

import java.time.Instant;
import java.util.Date;
import javax.persistence.*;
import javax.validation.constraints.Size;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;

@Data
@Entity
public class Income {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="user_id", nullable = false)
    private User user;

    @CreatedDate
    private Date createDate;

    @Size(max = 50)
    private String source;

    private Double totalAmount;

}
