// Simple function used by Items to put commas in prices

export default function format(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}