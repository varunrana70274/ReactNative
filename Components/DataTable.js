/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View } from 'react-native';
import { DataTable } from 'react-native-paper';
import React, { useState, useEffect } from 'react';
import { responsiveScreenHeight } from 'react-native-responsive-dimensions';
import axios from 'axios';

export default function DataTables() {
    const [page, setPage] = useState(1);
    const [numberOfItemsPerPageList] = useState([5,10]);
    const [itemsPerPage, onItemsPerPageChange] = useState(
        numberOfItemsPerPageList[0]
    );
    const [items, setItems] = useState([]);
    useEffect(() => {
        getProduct();
      }, [])
    const getProduct = async () => {
        axios
          .get(
            `https://jsonplaceholder.typicode.com/comments/`,
          )
          .then(res => {
            // console.log(res.data);
            setItems(res.data);
          })
          .catch(err => {
            console.log('Error', err);
          });
      };
    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, items.length);

    useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);
    return (
        <View>
            <DataTable style={{
                // width: "92%",
                backgroundColor: 'white',
                // margin: responsiveScreenHeight(2),
                elevation:5
            }}>
                <DataTable.Header>
                    <DataTable.Title sortDirection='descending'>ID</DataTable.Title>
                    <DataTable.Title sortDirection='descending'>Name</DataTable.Title>
                    <DataTable.Title sortDirection='descending'>Email</DataTable.Title>
                    <DataTable.Title sortDirection='descending'>Post Id</DataTable.Title>
                </DataTable.Header>

                {items.slice(from, to).map((item) => (
                    <DataTable.Row key={item.key}>
                        <DataTable.Cell sortDirection='descending'>{item.id}</DataTable.Cell>
                        <DataTable.Cell sortDirection='descending'>{item.name}</DataTable.Cell>
                        <DataTable.Cell sortDirection='descending'>{item.email}</DataTable.Cell>
                        <DataTable.Cell sortDirection='descending'>{item.postId}</DataTable.Cell>
                    </DataTable.Row>
                ))}

                <DataTable.Pagination
                    page={page}
                    numberOfPages={Math.ceil(items.length / itemsPerPage)}
                    onPageChange={(page) => setPage(page)}
                    label={`${from + 1}-${to} of ${items.length}`}
                    numberOfItemsPerPageList={numberOfItemsPerPageList}
                    numberOfItemsPerPage={itemsPerPage}
                    onItemsPerPageChange={onItemsPerPageChange}
                    showFastPaginationControls
                    selectPageDropdownLabel={'Rows per page'}
                />
            </DataTable>
        </View>
    );
}

const styles = StyleSheet.create({});
