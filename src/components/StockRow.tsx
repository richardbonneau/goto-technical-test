import { format } from 'date-fns'
import { colors } from '../utils/constants';

interface StockRowProps {
    timestamp: number;
    price: number;
    previousPrice: number;
    socialMediaCount: number;
    recommendation: string;
  }
  
  const StockRow: React.FC<StockRowProps> = ({ timestamp, price, previousPrice, socialMediaCount, recommendation }) => {
    const priceStyle = {
      color: price > previousPrice ? colors.green : price < previousPrice ? colors.red : colors.white,
    };
  
    return (
      <tr>
        <td>{format(timestamp, "PP")}</td>
        <td style={priceStyle}>{price}</td>
        <td>{socialMediaCount}</td>
        <td>{recommendation}</td>
      </tr>
    );
  };
  
  export default StockRow;