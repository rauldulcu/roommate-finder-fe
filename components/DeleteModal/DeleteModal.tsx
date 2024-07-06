import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { Icon } from "@rneui/themed";
import { Button } from "@rneui/base";
import { styles } from "./styles";

type DeleteModalProps = {
  isOpen: boolean;
  handleDelete: () => void;
  closeModal: () => void;
};

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  handleDelete,
  closeModal,
}) => {
  return (
    <Modal
      visible={isOpen}
      transparent={true}
      animationType="fade"
      onRequestClose={closeModal}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Icon name="close" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.modalText}>
            Are you sure you want to do this? It is irreversible.
          </Text>
          <Button
            title="Confirm"
            buttonStyle={styles.confirmButton}
            onPress={handleDelete}
          />
        </View>
      </View>
    </Modal>
  );
};

export default DeleteModal;
