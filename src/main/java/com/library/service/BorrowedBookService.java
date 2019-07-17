package com.library.service;

import com.library.domain.BorrowedBook;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing BorrowedBook.
 */
public interface BorrowedBookService {

    /**
     * Save a borrowedBook.
     *
     * @param borrowedBook the entity to save
     * @return the persisted entity
     */
    BorrowedBook save(BorrowedBook borrowedBook);

    /**
     * Get all the borrowedBooks.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<BorrowedBook> findAll(Pageable pageable);


    /**
     * Get the "id" borrowedBook.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<BorrowedBook> findOne(Long id);

    /**
     * Delete the "id" borrowedBook.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
