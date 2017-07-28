export default function() {

    this.set = () => {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.centerX = window.innerWidth/2;
        this.centerY =  window.innerHeight/2;
    }

    this.set();

    return this;
}