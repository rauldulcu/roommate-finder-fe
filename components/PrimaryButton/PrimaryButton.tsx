import { Button, ButtonProps, Text } from "@rneui/themed";
import { styles } from "./styles";

const PrimaryButton: React.FC<ButtonProps> = ({ ...props }) => {
  return (
    <Button
      buttonStyle={styles.buttonStyle}
      containerStyle={styles.containerStyle}
      {...props}
    />
  );
};

export default PrimaryButton;
