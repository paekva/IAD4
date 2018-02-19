 package ru.example.spring.lab.attemp.domain;

        import com.fasterxml.jackson.annotation.JsonIgnore;
        import lombok.Data;

        import javax.persistence.Entity;
        import javax.persistence.GeneratedValue;
        import javax.persistence.Id;
        import javax.persistence.ManyToOne;

@Data
@Entity
public class Point {
    private @Id @GeneratedValue Long id;
    private double x;
    private double y;
    private int r;
    private boolean inside;
    private @JsonIgnore @ManyToOne Account owner;

    @SuppressWarnings("unused")
    public Point () {}

    public Point (final double x, final double y, final int r, final Account owner) {
        this.owner = owner;
        this.x = x;
        this.y = y;
        this.r = r;
        setInside();
    }

    private void setInside() {
        if((x<0)&&(y<0)&&(x*x+y*y<r*r)) inside=true;
        else if((x>0)&&(y<0)&&(y>x-r)) inside=true;
        else if((x>0)&&(y>0)&&(x<r)&&(y<r)) inside=true;
        else inside=false;
    }

    public void setX(double x) {
        this.x = x;
        setInside();
    }

    public void setY(double y) {
        this.y = y;
        setInside();
    }

    public void setR(int r) {
        this.r = r;
        setInside();
    }

    public int getR() {
        return r;
    }

    public double getY() {
        return y;
    }

    public double getX() {
        return x;
    }

    public boolean getInArea() {
        return inside;
    }
}