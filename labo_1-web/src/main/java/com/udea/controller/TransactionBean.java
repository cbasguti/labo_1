/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.udea.controller;

import com.udea.entity.Clientes;
import com.udea.session.ClientesManagerLocal;
import java.io.Serializable;
import java.util.List;
import javax.ejb.EJB;

/**
 *
 * @author sebas, victor y otros
 */
public class TransactionBean implements Serializable {

    @EJB
    private ClientesManagerLocal clientesManager;

    private Clientes cliente;
    private List<Clientes> clientes;

    /**
     * Creates a new instance of TransactionBean
     */
    public TransactionBean() {
        cliente = new Clientes();
    }

    public List<Clientes> getClientes() {
        if ((clientes == null) || (clientes.isEmpty())) {
            refresh();
        }
        return clientes;
    }

    public Clientes getDetails() {
        return cliente;
    }

    public String create() {
        System.out.println("###CREATE###");
        cliente = clientesManager.addClient(cliente);
        return "SAVED";

    }

    public void refresh() {
        clientes = clientesManager.getAllClientes();
    }

    public String validate() {
        if (cliente.getCvv() < 100 || cliente.getCvv() > 999) {
            System.out.println("El cvv no es válido");
            return null;
        }

        create();
        return "SAVED";
    }

}
